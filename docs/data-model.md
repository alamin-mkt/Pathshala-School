# Pathshala Multi-Tenant Architecture & Data Model

## 1. Architectural Philosophy
Pathshala operates on a shared-application, multi-tenant partitioned schema on Cloud Firestore.
Every school (tenant) is represented as a first-class entity under `/schools/{schoolId}`.
Security is enforced by Firebase Custom Claims, where every issued token contains:
```json
{
  "role": "schoolAdmin | teacher | accountant | student | parent | superAdmin",
  "schoolId": "string"
}
```

## 2. Multi-Tenant ERD Diagram

```mermaid
erDiagram
    SCHOOL ||--o{ ACADEMIC_YEAR : configures
    SCHOOL ||--o{ CLASS : contains
    CLASS ||--o{ SECTION : divides_into
    SECTION ||--o{ ENROLLMENT : registers
    STUDENT ||--o{ ENROLLMENT : has
    STUDENT }o--o{ GUARDIAN : linked_to
    CLASS ||--o{ SUBJECT : teaches
    SECTION ||--o{ TIMETABLE_SLOT : schedules
    SECTION ||--o{ ATTENDANCE_RECORD : tracks
    CLASS ||--o{ EXAM : tests
    EXAM ||--o{ RESULT : generates
    STUDENT ||--o{ INVOICE : billed
    INVOICE ||--o{ PAYMENT : settles
    SCHOOL ||--o{ STAFF : employs
    SCHOOL ||--o{ NOTICE : broadcasts
    SCHOOL ||--o{ CMS_CONTENT : customizes

    SCHOOL {
        string schoolId PK
        string name
        string slug
        string planId
        string status
        json branding
        json settings
    }

    STUDENT {
        string id PK
        string schoolId FK
        string admissionNo
        string firstName
        string lastName
        string currentClassId
        string currentSectionId
        string[] guardianIds
    }

    ATTENDANCE_RECORD {
        string id PK "date_sectionId"
        string schoolId FK
        string classId
        string sectionId
        date date
        json attendanceMap
    }

    INVOICE {
        string id PK
        string invoiceNumber
        string schoolId FK
        string studentId FK
        decimal totalAmount
        decimal paidAmount
        decimal dueAmount
        string status
    }
```

## 3. Storage Architecture
- `/schools/{schoolId}/public/*` - School logos, banners, public event media.
- `/schools/{schoolId}/documents/*` - Sensitive student admission documents, report cards, fee receipts.
- `/users/{userId}/*` - User profile pictures.
