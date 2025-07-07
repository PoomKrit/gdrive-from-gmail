# gdrive-from-gmail
นี่เป็นโค้ด Google Script ที่ใช้สำหรับดึงไฟล์แนบจาก Gmail ไปเก็บใน Google Drive อัตโนมัติครับ
โค้ดต้นฉบับเอามาจาก https://github.com/ahochsteger/gmail2gdrive ขอบคุณเจ้าของโค้ดด้วยครับ :)

## วิธีการใช้งาน (How to Use)

### 1. การตั้งค่าเริ่มต้น (Initial Setup)

#### สร้าง Google Apps Script Project ใหม่
1. ไปที่ [Google Apps Script](https://script.google.com)
2. คลิก "New project" เพื่อสร้างโปรเจกต์ใหม่
3. ตั้งชื่อโปรเจกต์ เช่น "Gmail to Google Drive"

#### อัปโหลดไฟล์ Script
1. ลบไฟล์ `Code.gs` เริ่มต้นที่มีอยู่
2. สร้างไฟล์ใหม่ 2 ไฟล์:
   - `config.gs` - คัดลอกเนื้อหาจากไฟล์ `config.gs` ในโปรเจกต์นี้
   - `gm2gd.gs` - คัดลอกเนื้อหาจากไฟล์ `gm2gd.gs` ในโปรเจกต์นี้

### 2. การกำหนดค่า (Configuration)

#### แก้ไขไฟล์ `config.gs`
ปรับแต่งการตั้งค่าตามความต้องการ:

```javascript
// ตัวอย่างการตั้งค่าพื้นฐาน
{
  "globalFilter": "has:attachment",  // กรองอีเมลที่มีไฟล์แนบ
  "processedLabel": "to-gdrive/processed",  // ป้ายกำกับสำหรับอีเมลที่ประมวลผลแล้ว
  "sleepTime": 100,  // เวลาหน่วงระหว่างการประมวลผล (มิลลิวินาที)
  "maxRuntime": 300,  // เวลาทำงานสูงสุด (วินาที)
  "newerThan": "6m",  // ประมวลผลเฉพาะอีเมลใหม่กว่า 6 เดือน
  "timezone": "ICT",  // เขตเวลา
  "rules": [
    // กฎการประมวลผลไฟล์แนบ
  ]
}
```

#### การสร้างกฎ (Rules)
แต่ละกฎจะกำหนดว่าอีเมลจากผู้ส่งไหนจะเก็บไฟล์แนบไว้ที่โฟลเดอร์ไหน:

```javascript
{
  "filter": "from:example@company.com",  // กรองจากผู้ส่ง
  "folder": "'Bills/Company/'yyyy/MM",  // โฟลเดอร์ปลายทาง (รูปแบบวันที่)
  "filenameTo": "'invoice_'dd-MM-yyyy"  // รูปแบบชื่อไฟล์ใหม่ (ถ้าต้องการ)
}
```

### 3. การให้สิทธิ์ (Permissions)

1. คลิก "Run" เพื่อทดสอบ script ครั้งแรก
2. ระบบจะขออนุญาตเข้าถึง:
   - Gmail (เพื่ออ่านอีเมลและไฟล์แนบ)
   - Google Drive (เพื่อสร้างโฟลเดอร์และบันทึกไฟล์)
3. คลิก "Allow" เพื่ออนุญาต

### 4. การรันแบบอัตโนมัติ (Automated Execution)

#### ตั้งค่า Trigger
1. ไปที่เมนู "Triggers" (รูปนาฬิกา) ในแถบด้านซ้าย
2. คลิก "Add Trigger"
3. กำหนดค่า:
   - **Choose which function to run**: `Gmail2GDrive`
   - **Choose which deployment should run**: `Head`
   - **Select event source**: `Time-driven`
   - **Select type of time based trigger**: `Timer` (ทุกกี่นาที/ชั่วโมง)
   - **Select interval**: เลือกความถี่ที่ต้องการ (แนะนำทุก 15-30 นาที)
4. คลิก "Save"

### 5. การตรวจสอบการทำงาน (Monitoring)

#### ดู Log การทำงาน
1. ไปที่เมนู "Executions" เพื่อดูประวัติการทำงาน
2. ไปที่เมนู "Editor" แล้วคลิก "View Logs" เพื่อดูรายละเอียด

#### ตรวจสอบใน Gmail
- อีเมลที่ประมวลผลแล้วจะมีป้ายกำกับ "to-gdrive/processed"

#### ตรวจสอบใน Google Drive
- ไฟล์แนบจะถูกบันทึกในโฟลเดอร์ตามที่กำหนดในกฎ

### 6. การแก้ไขปัญหา (Troubleshooting)

#### ปัญหาที่พบบ่อย
1. **Script หยุดทำงาน**: ตรวจสอบใน Executions ว่ามี Error หรือไม่
2. **ไฟล์ไม่ถูกบันทึก**: ตรวจสอบว่ากฎ filter และ folder path ถูกต้อง
3. **Script ทำงานช้า**: ลด sleepTime หรือปรับ maxRuntime
4. **เกิน Quota**: Google Apps Script มีข้อจำกัดการใช้งาน ปรับความถี่ Trigger

#### การ Debug
```javascript
// เพิ่ม Logger.log() เพื่อ debug
Logger.log("DEBUG: Processing rule: " + rule.filter);
```

### 7. ตัวอย่างการใช้งาน (Examples)

#### บันทึกใบเสร็จจากร้านค้า
```javascript
{
  "filter": "from:receipt@store.com",
  "folder": "'Receipts/Store/'yyyy/MM",
  "filenameTo": "'receipt_'yyyy-MM-dd"
}
```

#### บันทึกบิลค่าไฟฟ้า
```javascript
{
  "filter": "from:billing@electric.com",
  "folder": "'Bills/Electric/'yyyy"
}
```

#### บันทึก PDF จากอีเมล
```javascript
{
  "filter": "label:ImportantPDF",
  "saveThreadPDF": true,
  "folder": "'PDF Documents'"
}
```

### 8. หมายเหตุสำคัญ (Important Notes)

- Script จะทำงานได้สูงสุด 6 นาทีต่อครั้ง (ข้อจำกัดของ Google Apps Script)
- แนะนำให้ทดสอบกับอีเมลจำนวนน้อยก่อน
- สำรองข้อมูลสำคัญก่อนใช้งาน
- ตรวจสอบ Quota การใช้งาน Google Apps Script เป็นประจำ

