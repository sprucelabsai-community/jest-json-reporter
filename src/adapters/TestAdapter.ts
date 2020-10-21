import SheetsReporterGoogleAdapter from './GoogleAdapter'

export default class SheetsReporterTestAdapter extends SheetsReporterGoogleAdapter {
	private randomCount = 0
	public async fetchCellValue(
		sheetId: string,
		worksheetId: number,
		cell: string
	) {
		const results = await this.fetchSheetAndCell(sheetId, worksheetId, cell)
		return results.cell.value
	}

	public async generateRandomWorksheet(sheetId: string): Promise<number> {
		const name = `TEST.${Date.now()}-${this.randomCount}`
		const sheet = await this.fetchSpreadsheet(sheetId)
		const worksheet = await sheet.addWorksheet({ title: name })

		this.randomCount++
		return parseInt(worksheet.sheetId, 10)
	}

	public async deleteWorksheet(
		sheetId: string,
		worksheetId: number
	): Promise<void> {
		const sheet = await this.fetchSpreadsheet(sheetId)

		const worksheet = sheet.sheetsById[worksheetId]

		await worksheet.delete()
	}

	protected async fetchSpreadsheet(sheetId: string) {
		return this.uncachedFetchSpreadsheet(sheetId)
	}
}
