/**
 * GOOGLE APPS SCRIPT FUNCTIONS FOR SETTINGS SHEET
 * 
 * Add these functions to your Google Apps Script backend
 * They read/write from the "Settings" sheet with key-value pairs
 */

// ============================================
// SETTINGS SHEET HELPER FUNCTIONS
// ============================================

/**
 * Get value from Settings sheet by key
 * Looks up the key in column A and returns the value from column B
 */
function getSettingValue(key) {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const settingsSheet = ss.getSheetByName("Settings");

        if (!settingsSheet) {
            return {
                status: "ERROR",
                message: "Settings sheet not found"
            };
        }

        // Get all data from Settings sheet
        const range = settingsSheet.getDataRange();
        const values = range.getValues();

        // Search for the key in column A
        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === key) {
                const value = values[i][1];
                return {
                    status: "OK",
                    key: key,
                    value: value
                };
            }
        }

        return {
            status: "ERROR",
            message: `Key '${key}' not found in Settings sheet`
        };
    } catch (error) {
        return {
            status: "ERROR",
            message: error.toString()
        };
    }
}

/**
 * Update value in Settings sheet by key
 * If key exists, updates the value in column B
 * If key doesn't exist, adds a new row
 */
function updateSettingValue(key, value) {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const settingsSheet = ss.getSheetByName("Settings");

        if (!settingsSheet) {
            return {
                status: "ERROR",
                message: "Settings sheet not found"
            };
        }

        // Get all data from Settings sheet
        const range = settingsSheet.getDataRange();
        const values = range.getValues();

        // Search for the key in column A
        for (let i = 0; i < values.length; i++) {
            if (values[i][0] === key) {
                // Key found, update the value
                settingsSheet.getRange(i + 1, 2).setValue(value);
                return {
                    status: "OK",
                    message: `Setting '${key}' updated to '${value}'`
                };
            }
        }

        // Key not found, add new row
        const nextRow = values.length + 1;
        settingsSheet.getRange(nextRow, 1).setValue(key);
        settingsSheet.getRange(nextRow, 2).setValue(value);

        return {
            status: "OK",
            message: `New setting '${key}' created with value '${value}'`
        };
    } catch (error) {
        return {
            status: "ERROR",
            message: error.toString()
        };
    }
}

// ============================================
// SIGNUP STATUS SPECIFIC FUNCTIONS
// ============================================

/**
 * Get signup enabled status from Settings sheet
 * Reads: Settings sheet, key="signup_enabled"
 */
function doGetSignupStatus() {
    try {
        const result = getSettingValue("signup_enabled");

        if (result.status === "OK") {
            // Parse the value as boolean
            const value = result.value;
            const enabled = value === true || value === "true" || value === "TRUE" || value === "yes" || value === "YES";

            return {
                status: "OK",
                enabled: enabled,
                raw_value: value
            };
        }

        return result;
    } catch (error) {
        return {
            status: "ERROR",
            message: error.toString(),
            enabled: false
        };
    }
}

/**
 * Update signup enabled status in Settings sheet
 * Writes: Settings sheet, key="signup_enabled", value="TRUE" or "FALSE"
 */
function doUpdateSignupStatus(enabled) {
    try {
        const value = enabled === true || enabled === "true" || enabled === 1 ? "TRUE" : "FALSE";
        const result = updateSettingValue("signup_enabled", value);

        return {
            status: result.status,
            message: result.message,
            enabled: value === "TRUE"
        };
    } catch (error) {
        return {
            status: "ERROR",
            message: error.toString()
        };
    }
}

// ============================================
// INTEGRATE WITH YOUR EXISTING MAIN HANDLER
// ============================================

/**
 * Add these cases to your existing doPost() function:
 */

// In your doPost() or similar main handler function, add:
/*

else if (action === "getSettingValue") {
  const key = data.key;
  const result = getSettingValue(key);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

else if (action === "updateSettingValue") {
  const key = data.key;
  const value = data.value;
  const result = updateSettingValue(key, value);
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

*/

// ============================================
// EXAMPLE: SETTINGS SHEET STRUCTURE
// ============================================

/*
Column A (key)        | Column B (value)
signup_enabled        | FALSE
other_setting         | some_value
another_setting       | another_value
*/
