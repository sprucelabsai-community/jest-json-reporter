import pathUtil from 'path'
import { IJestTestResult, ITestMap } from './sheetsReporter.types'

require('dotenv').config()

export class SheetsReporterUtility {
	public static getMappedTests(map: ITestMap, results: IJestTestResult[]) {
		return results.filter((testResult) => {
			return !!map[testResult.title]
		})
	}

	public static resolvePath(cwd: string, ...filePath: string[]): string {
		let builtPath = pathUtil.join(...filePath)

		if (builtPath[0] !== '/') {
			// Relative to the cwd
			if (builtPath.substr(0, 2) === './') {
				builtPath = builtPath.substr(1)
			}

			builtPath = pathUtil.join(cwd, builtPath)
		}

		return builtPath
	}

	public static resolveAdapterPath(adapterFilepath?: string) {
		const filePath = adapterFilepath ?? process.env.SHEETS_REPORTER_ADAPTER

		if (!filePath) {
			throw new Error(
				`SheetsReporter has no adapter set, try adding SHEETS_REPORTER_ADAPTER="MockAdapter" or SHEETS_REPORTER_ADAPTER="GoogleAdapter" to your env.`
			)
		}

		const basePath =
			filePath.search(new RegExp(pathUtil.sep)) > -1
				? process.cwd()
				: this.resolvePath(__dirname, 'adapters')

		const adapterPath = this.resolvePath(basePath, filePath)

		return adapterPath
	}
}
