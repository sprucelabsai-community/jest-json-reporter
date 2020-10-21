import {
	IJestTest,
	IJestTestResults,
	IJestTestResult,
	IGoogleSheetsAdapter,
	ISheetsReporterOptions,
	ITestMap,
} from './sheetsReporter.types'
import { SheetsReporterUtility } from './SheetsReporterUtility'

require('dotenv').config()

export default class SheetsReporter<TestMap extends ITestMap> {
	private adapter: IGoogleSheetsAdapter
	private testMap: TestMap
	private sheetId: string
	private worksheetId: number
	private errors: Error[] = []

	public constructor(_: any, options: ISheetsReporterOptions<TestMap>) {
		const adapterPath = SheetsReporterUtility.resolveAdapterPath(
			options.adapterFilepath
		)

		const AdapterClass = require(adapterPath).default

		try {
			this.adapter = new AdapterClass()
		} catch (err) {
			throw new Error(
				`Failed to load the SheetsAdapter at ${adapterPath}. Make sure the path is relative process.cwd() or absolute and it's being exported as default. Original error: ${err.stack}`
			)
		}

		this.testMap = options.testMap
		this.sheetId = options.sheetId
		this.worksheetId = options.worksheetId
	}

	// jest reporter hook
	public onTestResult(_: IJestTest, testResult: IJestTestResults) {
		const filteredTests = SheetsReporterUtility.getMappedTests(
			this.testMap,
			testResult.testResults
		)

		for (const test of filteredTests) {
			if (test.status === 'passed') {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				this.reportTestAsPassed(test.title)
			} else {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				this.reportTestAsFailed(test.title)
			}
		}
	}

	public async reportTestAsPassed(testName: keyof TestMap) {
		await this.reportTest(testName, 'passed')
	}

	public async reportTestAsFailed(testName: keyof TestMap) {
		await this.reportTest(testName, 'failed')
	}

	private async reportTest(
		testName: keyof TestMap,
		status: IJestTestResult['status']
	) {
		if (!this.testMap[testName]) {
			throw new Error(
				`Invalid test name. Got "${testName}" but expected one of the following: ${Object.keys(
					this.testMap
				).join(', ')}`
			)
		}
		const cell = this.testMap[testName]
		try {
			await this.adapter.updateCell({
				sheetId: this.sheetId,
				worksheetId: this.worksheetId,
				cell,
				value: status === 'passed' ? 1 : 0,
			})
		} catch (err) {
			console.log('Caught sheets reporter error', err)
			this.errors.push(err)
		}
	}

	public getLastError() {
		return this.errors[this.errors.length - 1]
	}
}
