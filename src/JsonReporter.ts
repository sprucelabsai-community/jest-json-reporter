import fsUtil from 'fs'
import {
	AggregatedResult,
	Context,
	Reporter,
	Test,
	TestResult,
} from '@jest/reporters'

export declare type Milliseconds = number
export declare type TestStatus =
	| 'passed'
	| 'failed'
	| 'skipped'
	| 'pending'
	| 'todo'
	| 'disabled'

declare type CallSite = {
	column: number
	line: number
}

export declare type AssertionResult = {
	ancestorTitles: Array<string>
	duration?: Milliseconds | null
	failureDetails: Array<unknown>
	failureMessages: Array<string>
	fullName: string
	invocations?: number
	location?: CallSite | null
	numPassingAsserts: number
	status: TestStatus
	title: string
}

export const START_DIVIDER =
	'***************************START_JSON_DIVIDER***************************'

export const END_DIVIDER =
	'***************************END_JSON_DIVIDER***************************'

export default class SheetsReporter implements Reporter {
	public onTestFileResult(
		test: Test,
		testResult: TestResult,
		aggregatedResult: AggregatedResult
	) {
		this.render({
			status: 'onTestFileResult',
			test,
			testResult,
			aggregatedResult,
		})
	}

	public onRunStart(results: AggregatedResult) {
		this.render({ status: 'onRunStart', results })
	}

	public onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
		this.render({ status: 'onRunComplete', contexts, results })
	}

	public onTestCaseResult(test: Test, testCaseResult: AssertionResult) {
		this.render({ status: 'onTestCaseResult', test, testCaseResult })
	}

	public onTestFileStart(test: Test) {
		this.render({ status: 'onTestFileStart', test })
	}

	public getLastError() {
		return undefined
	}

	public onTestResult(test: Test, testResult: TestResult) {
		this.render({ status: 'onTestResult', test, testResult })
	}

	private render(obj: Record<string, any>) {
		const toWrite = START_DIVIDER + JSON.stringify(obj) + END_DIVIDER + '\n'
		console.log(toWrite)
	}

	public onTestStart(test: Test) {
		this.render({ status: 'onTestStart', test })
	}
}
