import {
    AggregatedResult,
    TestContext,
    Reporter,
    Test,
    TestResult,
} from '@jest/reporters'
import { cycle } from './cycle'

export declare type Milliseconds = number
export declare type TestStatus =
    | 'passed'
    | 'failed'
    | 'skipped'
    | 'pending'
    | 'todo'
    | 'disabled'
    | 'focused'

declare interface CallSite {
    column: number
    line: number
}

export declare interface AssertionResult {
    ancestorTitles: string[]
    duration?: Milliseconds | null
    failureDetails: unknown[]
    failureMessages: string[]
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

export default class JsonReporter implements Reporter {
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

    public onRunComplete(
        contexts: Set<TestContext>,
        results: AggregatedResult
    ) {
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
        const string = cycle(obj)
        const toWrite =
            START_DIVIDER + JSON.stringify(string) + END_DIVIDER + '\n'
        console.log(toWrite)
        return toWrite
    }

    public onTestStart(test: Test) {
        this.render({ status: 'onTestStart', test })
    }
}

export * from './cycle'
