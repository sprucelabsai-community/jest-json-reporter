# Google Sheets Reporter

Update a Google Sheet when your tests pass or fail.

<img src="https://raw.githubusercontent.com/sprucelabsai/jest-sheets-reporter/master/docs/images/overview.png">

## Example Jest config

```json
"jest": {
    "reporters": [
        "default",
        [
            "@sprucelabs/jest-sheets-reporter",
            {
                "sheetId": "{{spreadsheetId}}",
                "worksheetId": {{tabId}},
                "testMap": {
                    "testName": "destinationCell",
                    "getsGoodHealthCheckAndNothingElse": "C5",
                    "canGetLatestVersionBasedOnDir": "C16",
                    "canBuildSkill": "C24",
                    "canWatchAndBuild": "C25"
                }
            }
        ]
    ]
},
```

## How does it work

This simple reporter matches the name of your test against what is in your `jest` config and updates the cell whose name matches.

If a test passes, the cell is set to 1. 

If a test fails, the cell is set to 0.


## Making it pretty

You can change the look of a cell by using conditional formatting:

<img src="https://raw.githubusercontent.com/sprucelabsai/jest-sheets-reporter/master/docs/images/conditional.png">

Then we set the background and the text color based on the value being exactly `1` or `0`.

<img src="https://raw.githubusercontent.com/sprucelabsai/jest-sheets-reporter/master/docs/images/stylerules.png">