import { test, assert } from '@sprucelabs/test'
import AbstractSheetsReporterTest from '../../AbstractSheetsReporterTest'
import { IGoogleSheetsAdapter } from '../../sheetsReporter.types'
import { SheetsReporterUtility } from '../../SheetsReporterUtility'
require('dotenv').config()

const sheetsAdapterPath = SheetsReporterUtility.resolveAdapterPath(
	process.env.SHEETS_REPORTER_ADAPTER_TEST ?? 'GoogleAdapter'
)

const AdapterClass = require(sheetsAdapterPath).default

export default class SheetsAdapterTest extends AbstractSheetsReporterTest {
	private static adapter: IGoogleSheetsAdapter
	private static sheetId = '1MFb9AkB8sm7rurYew8hgzrXTz3JDxOFhl4kN9sNQVxw'
	private static worksheetId: number

	protected static async beforeEach() {
		await super.beforeEach()

		const email = process.env.GOOGLE_SERVICE_EMAIL_TEST as string
		const key = process.env.GOOGLE_SERVICE_PRIVATE_KEY_TEST as string

		this.adapter = new AdapterClass({
			serviceEmail: email,
			privateKey: key,
		})
	}

	protected static async beforeAll() {
		this.worksheetId = await this.sheetsAdapter.generateRandomWorksheet(
			this.sheetId
		)
	}

	protected static async afterAll() {
		await super.afterAll()
		await this.sheetsAdapter.deleteWorksheet(this.sheetId, this.worksheetId)
	}

	@test('can set number value', 100)
	@test('can set a boolean value', true)
	@test('can set string value', 'it worked!')
	protected static async canUpdateCell(expected: string | number | boolean) {
		const sheetId = this.sheetId
		const worksheetId = this.worksheetId

		await this.adapter.updateCell({
			sheetId,
			worksheetId,
			cell: 'A1',
			value: expected,
		})

		// make sure it actually worked
		const actualValue = await this.sheetsAdapter.fetchCellValue(
			sheetId,
			worksheetId,
			'A1'
		)

		assert.isEqual(actualValue, expected)
	}
}
