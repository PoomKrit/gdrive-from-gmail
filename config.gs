/**
 * Configuration for Gmail2GDrive
 * See https://github.com/ahochsteger/gmail2gdrive/blob/master/README.md for a config reference
 */
function getGmail2GDriveConfig() {
  return {
    // Global filter
    "globalFilter": "has:attachment",
    // Gmail label for processed threads (will be created, if not existing):
    "processedLabel": "to-gdrive/processed",
    // Sleep time in milli seconds between processed messages:
    "sleepTime": 100,
    // Maximum script runtime in seconds (google scripts will be killed after 5 minutes):
    "maxRuntime": 300,
    // Only process message newer than (leave empty for no restriction; use d, m and y for day, month and year):
    // "newerThan": "9m",
    "newerThan": "6m",
    //"newerThan": "",
    // Timezone for date/time operations:
    "timezone": "ICT",
    // Processing rules:
    "rules": [
      {
        "filter": "from:support@amway.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Bill/Amway/'yyyy/MM",
        "filenameTo": "'date'_dd-'order_%o'"
      },
      {
        "filter": "from:info@info.amway.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Bill/Amway/'yyyy/MM",
        "filenameTo": "'date'_dd-'order_%o'"
      },
      {
        "filter": "from:etax_customer@pttor.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/PTT/'yyyy/MM"
      },
      {
        "filter": "from:etax@egat.co.th",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/ELEXA/'yyyy/MM"
      },
      {
        "filter": "from:etax@pea.co.th",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/PEA/'yyyy/MM"
      },
      {
        "filter": "from:Support@eaanywhere.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/EA/'yyyy/MM"
      },
      {
        "filter": "from:edocument@mail.etaxsolution.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/SHARGE/'yyyy/MM"
      },
      {
        "filter": "from:onionev@arunplus.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/ONION/'yyyy/MM"
      },
      {
        "filter": "from:service@csenergytech.com",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/IGREEN/'yyyy/MM"
      },
      {
        "filter": "from:ebill@mea.or.th",
        "folder": "'ยู แอนด์ มี เลิฟ/Ev charge/MEA/'yyyy/MM"
      },      
      /*
      { // Store all attachments sent to my.name+scans@gmail.com to the folder "Scans"
        "filter": "to:my.name+scans@gmail.com",
        "folder": "'Scans'-yyyy-MM-dd"
      },
      { // Store all attachments from example1@example.com to the folder "Examples/example1"
        "filter": "from:example1@example.com",
        "folder": "'Examples/example1'"
      },
      { // Store all attachments sent to my.name+scans@gmail.com to the folder "Scans" with extend received dates
        "filter": "to:my.name+scans@gmail.com",
        "folder": "'Scans'-yyyy-MM-dd",
        "newerThan": "3m" // received in the last 3 months (applied for this rule only)
      },
      { // Store all pdf attachments from example2@example.com to the folder "Examples/example2"
        "filter": "from:example2@example.com",
        "folder": "'Examples/example2'",
        "filenameFromRegexp": ".*\.pdf$"
      },
      { // Store all attachments from example1@example.com to the SHARED Drive folder "Shared Drives/Lambda/Examples/example1"
        "parentFolderId": "FOLDER_ID_FOR_Lambda_FOLDER", // This approach is with the ID of "Lambda"
        "filter": "from:example1@example.com",
        "folder": "'Examples/example1'"
      },
      { // Store all attachments from example1@example.com to the SHARED Drive folder "Shared Drives/Lambda/Examples/example1"
        "parentFolderId": "FOLDER_ID_FOR_Examples_FOLDER", // This approach is with the ID of "Examples"
        "filter": "from:example1@example.com",
        "folder": "'example1'" // Note: We omited the folder path "Examples" since it's the direct parent
      },
      { // Store all attachments from example3a@example.com OR from:example3b@example.com
        // to the folder "Examples/example3ab" while renaming all attachments to the pattern
        // defined in 'filenameTo' and archive the thread.
        // filenameTo supports the following printf style substitutions:
        // %s - The subject of the message/thread
        // %o - The original filename of the attachement
        "filter": "has:attachment (from:example3a@example.com OR from:example3b@example.com)",
        "folder": "'Examples/example3ab'",
        "filenameTo": "'file-'yyyy-MM-dd-'%s.txt'",
        "archive": true
      },
      {
        // Store threads marked with label "PDF" in the folder "PDF Emails" as PDF document.
        "filter": "label:PDF",
        "saveThreadPDF": true,
        "folder": "PDF Emails"
      },
      {
        // Store each INDIVIDUAL email as "PDF" instead of an entire thread, in the folder "PDF Emails"
        "filter": "from:no_reply@email-invoice.example.com",
        "saveMessagePDF": true,
        "skipPDFHeader": true, // Skip Email Header
        "folder": "PDF Emails"
      },
      {
        // Store threads marked with label "PDF" in the folder "PDF Emails" as PDF document.
        // while renaming the PDFs to the pattern defined in 'filenameTo'.
        // filenameTo supports the following printf style substitutions:
        // %s - The subject of the message/thread
        // NOTE: .pdf will automatically be added to the file name
        "filter": "label:PDF",
        "saveThreadPDF": true,
        "folder": "PDF Emails",
        "filenameTo": "'file-'yyyy-MM-dd-'%s'"
      },
      {
        // Store all attachments named "file.txt" from example4@example.com to the
        // folder "Examples/example4" and rename the attachment to the pattern
        // defined in 'filenameTo' and archive the thread.
        // filenameTo supports the following printf style substitutions:
        // %s - The subject of the message/thread
        // %o - The original filename of the attachement
        // %d - A running counter from 1 for each match of this rule.
        "filter": "has:attachment from:example4@example.com",
        "folder": "'Examples/example4'",
        "filenameFrom": "file.txt",
        "filenameTo": "'file-'yyyy-MM-dd-'%s.txt'"
      },
      {
        // Store all of the emails with the text "receipt" from billing@zoom.us
        // into the folder "Examples/example5" and rename the filenames to be zoom-1.pdf, zoom-2.pdf...
        "filter": "receipt from:billing@zoom.us",
        "folder": "'Examples/example5'",
        "filenameFrom": "*.pdf",
        "filenameTo": "'zoom-%d.pdf'"
      },
      {
        // Store threads marked with label "PDF" in the folder "PDF Emails" als PDF document and add "addPDFlabel" to the processed thread.
        "filter": "label:PDF",
        "ruleLabel": "addPDFlabel",
        "folder": "PDF Emails"
      }, */
    ]
  };
}
