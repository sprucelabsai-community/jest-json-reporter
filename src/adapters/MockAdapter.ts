import SheetsReporterTestAdapter from './TestAdapter'

export default class SheetsReporterMockAdapter extends SheetsReporterTestAdapter {
	private static cellCache: Record<string, string | number | boolean> = {}
	public async updateCell(options: {
		sheetId: string
		worksheetId: number
		cell: string
		value: string | number | boolean
	}): Promise<void> {
		const key = `${options.sheetId}${options.worksheetId}${options.cell}`
		SheetsReporterMockAdapter.cellCache[key] = options.value
	}

	public async fetchCellValue(
		sheetId: string,
		worksheetId: number,
		cell: string
	) {
		const key = `${sheetId}${worksheetId}${cell}`
		return SheetsReporterMockAdapter.cellCache[key]
	}

	public async generateRandomWorksheet() {
		return -1
	}

	public async deleteWorksheet() {}
}
