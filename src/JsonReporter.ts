import { Reporter, Test, TestResult } from '@jest/reporters'

export const START_DIVIDER =
	'***************************START_JSON_DIVIDER***************************'

export const END_DIVIDER =
	'***************************END_JSON_DIVIDER***************************'

export default class SheetsReporter implements Reporter {
	public onTestFileResult = undefined
	public onTestCaseResult = undefined
	public onTestFileStart = undefined

	public onRunStart() {}
	public onRunComplete() {}
	public getLastError() {}
	public onTestResult(_: Test, testResult: TestResult) {
		console.log(START_DIVIDER)
		console.log(JSON.stringify({ status: 'testComplete', results: testResult }))
		console.log(END_DIVIDER)
	}

	public onTestStart(test: Test) {
		console.log(START_DIVIDER)
		console.log(JSON.stringify({ status: 'testStart', test }))
		console.log(END_DIVIDER)
	}
}
