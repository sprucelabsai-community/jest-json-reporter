import AbstractSpruceTest, { assert, test } from '@sprucelabs/test'
import { retrocycle } from '../cycle'
import JsonReporter, { END_DIVIDER, START_DIVIDER } from '../JsonReporter'

export default class StringifyTest extends AbstractSpruceTest {
	@test()
	protected static canStringifyRecursive() {
		let obj: Record<string, any> = {
			go: 'team',
			around: true,
		}

		obj.recursive = obj

		const reporter = new JsonReporter()

		//@ts-ignore
		const lastLogged = reporter.render(obj)

		const parsed = JSON.parse(
			//@ts-ignore
			lastLogged.replace(START_DIVIDER, '').replace(END_DIVIDER, '').trim()
		)

		assert.isEqualDeep(parsed, {
			go: 'team',
			around: true,
			recursive: { $ref: '$' },
		})

		const uncycled = retrocycle(parsed)

		assert.isEqual(uncycled.go, 'team')
		assert.isEqual(uncycled.around, true)
		assert.isTruthy(uncycled.recursive)
	}
}
