import AbstractSpruceTest, { assert, test } from '@sprucelabs/test'
import JsonReporter, { END_DIVIDER, START_DIVIDER } from '../JsonReporter'

export default class StringifyTest extends AbstractSpruceTest {
	@test.skip()
	protected static canStringifyRecursive() {
		let obj: Record<string, any> = {
			go: 'team',
			around: true,
		}

		obj.rescursive = obj

		const reporter = new JsonReporter()

		//@ts-ignore
		const lastLogged = reporter.render(obj)

		const parsed = JSON.parse(
			lastLogged.replace(START_DIVIDER, '').replace(END_DIVIDER, '').trim()
		)

		assert.isEqualDeep(parsed, {
			go: 'team',
			around: true,
			rescursive: { $ref: '$' },
		})
	}
}
