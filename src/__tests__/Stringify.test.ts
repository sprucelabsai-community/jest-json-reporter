import AbstractSpruceTest, { test } from '@sprucelabs/test'
import JsonReporter from '../JsonReporter'

export default class StringifyTest extends AbstractSpruceTest {
	@test()
	protected static canStringifyRecursive() {
		let obj: Record<string, any> = {
			go: 'team',
			around: true,
		}

		obj.rescursive = obj

		const reporter = new JsonReporter()

		//@ts-ignore
		reporter.render(obj)
	}
}
