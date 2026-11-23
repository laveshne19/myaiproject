"""
Nalanda Enterprises vs Imagine Marketing Ltd (boAt)
Scheme / credit note pendency, tied to the IML account statement.

Inputs (data/):
  IML_SOA_01Apr25_to_22Sep26.xlsx          SOA mailed by Rohit Bhise, 22 Sep 2026
  IML_Statement_FY2627_upto_16Nov26.xls    Customer Report 0001100164, 16 Nov 2026
  IML_Overdue_16Nov26.xls                  Open items as on 16 Nov 2026

Output:
  Nalanda_IML_Scheme_Reconciliation.xlsx

Run:  python3 build_pendency_excel.py
"""
import re
from datetime import date
import pandas as pd
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

DATA = "data/"
OUT = "Nalanda_IML_Scheme_Reconciliation.xlsx"
AS_ON = "16 Nov 2026"
OPENING_FY27 = 14951238.87


# ----------------------------------------------------------------- ledger
def load_ledger():
    a = pd.read_excel(DATA + "IML_SOA_01Apr25_to_22Sep26.xlsx", header=2)
    a = a.rename(columns={"Amount in Local Curr": "Amt", "Doc Type": "DT",
                          "Posting Date": "PD", "Document Number": "DocNo"})
    a = a[a["DT"].notna()].copy()
    a["src"] = "SOA 01.04.25-22.09.26"
    b = pd.read_csv(DATA + "IML_Statement_FY2627_upto_16Nov26.xls", sep="\t", encoding="utf-16")
    b.columns = [c.strip() for c in b.columns]
    b = b.rename(columns={"Amount in LC": "Amt", "Document Type": "DT",
                          "Posting Date": "PD", "Document Number": "DocNo"})
    b = b[b["DT"].notna()].copy()
    b["Amt"] = pd.to_numeric(b["Amt"].astype(str).str.replace(",", ""), errors="coerce")
    b["PD"] = pd.to_datetime(b["PD"], format="%d.%m.%Y")
    b["Account"] = 1100164
    b["src"] = "Statement FY26-27 (16.11.26)"
    a["PD"] = pd.to_datetime(a["PD"])
    a1 = a[(a["PD"] < "2026-04-01") | (a["Account"] != 1100164)]
    cols = ["Account", "PD", "DT", "DocNo", "Assignment", "Amt", "Text", "src"]
    d = pd.concat([a1[cols], b[cols]], ignore_index=True)
    d["Account"] = d["Account"].astype(int)
    d["DocNo"] = d["DocNo"].apply(lambda x: "" if pd.isna(x) else str(int(x)))
    d["Assignment"] = d["Assignment"].apply(lambda x: "" if pd.isna(x) else str(x).replace(".0", ""))
    d["Text"] = d["Text"].fillna("")
    return d.sort_values(["Account", "PD"]).reset_index(drop=True), b


MONTHS = {"JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6, "JUNE": 6,
          "JUL": 7, "JULY": 7, "AUG": 8, "SEP": 9, "SEPT": 9, "OCT": 10, "NOV": 11, "DEC": 12}


def scheme_period(text):
    t = text.upper()
    m = re.search(r"\b(JFM|AMJ|JAS|OND|ASO)[-' ]?(\d{2})\b", t)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    m = re.search(r"\b(JANUARY|FEBRUARY|MARCH|APRIL|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER|"
                  r"JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEPT|SEP|OCT|NOV|DEC)[-' ]?(\d{2})\b", t)
    if m:
        k = m.group(1)[:4] if m.group(1)[:4] in MONTHS else m.group(1)[:3]
        return f"{list(MONTHS.keys())[list(MONTHS.values()).index(MONTHS[k])]}-{m.group(2)}"
    return ""


def scheme_head(text):
    t = text.upper()
    rules = [
        ("COURIER", "Courier charges reimbursed"), ("FOS INCE", "FOS incentive"), ("NIRVANA", "Additional SKU scheme"),
        ("SELLOUT TIEUP", "Tie-up secondary"), ("SUB D", "SubD 2% claim"),
        ("PRIMARY SCHEME SUPPORT", "Primary support (combined)"), ("PRIMARY CN FOR", "Primary support (combined)"),
        ("PRIMARY NORMAL A&W", "A&W normal primary"), ("PRIMARY ADDITIONAL A&W", "A&W additional primary"),
        ("PRIMARY NORMAL ACC", "ACC normal primary"),
        ("/0001100164", "Monthly CN (head not in text)"),
        ("MT-CPR", None), ("TOT", "Quarterly TOT"), ("QUARTER", "Quarterly tie-up"), ("Q1 TIE", "Quarterly tie-up"),
        ("ASO TIEUP", "Quarterly tie-up"), ("ADD-SECONDARY TIE", "Tie-up secondary"), ("SECONDARY TIE", "Tie-up secondary"),
        ("TIEUP", "Tie-up primary"), ("TIE UP AUDIO", "Tie-up primary"), ("AUDIO TIE UP", "Tie-up primary"),
        ("TIE UP WEARABLE", "Tie-up primary"), ("TIE UP ACCESSORIES", "Tie-up primary"), ("PRIMARY TIE", "Tie-up primary"),
        ("ADD-AUDIO", "Additional SKU scheme"), ("ADD-AIRDOPES", "Additional SKU scheme"), ("FB ADDITIONAL", "Additional SKU scheme"),
        ("SLAB", "Slab scheme"),
        ("LINEARITY", "Tie-up linearity"), ("TIE UP %-SEC", "Tie-up secondary"),
        ("TIE UP %-PRI", "Tie-up primary"), ("PRICE DIFF", "Price difference"),
        ("DEMO", "Demo scheme"), ("SUB D", "SubD 2% claim"),
        ("A&W ADDITIONAL", "A&W additional primary"), ("ACC ADDITIONAL", "ACC additional primary"),
        ("A&W NORMAL", "A&W normal primary"), ("ACC NORMAL", "ACC normal primary"),
        ("SOA11", "Slab scheme"), ("SOB11", "Slab scheme"), ("INFINITY", "Add Infinity"),
        ("ADD SECONDARY", "Secondary support"), ("SECONDARY", "Secondary support"),
        ("PRIMARY", "Primary support (other)"), ("PRI FOR", "Primary support (other)"),
    ]
    for k, v in rules:
        if k in t:
            if v is None:
                return "MT-CPR primary" if "/P/" in t else "MT-CPR secondary"
            return v
    return "Other"


# ----------------------------------------------------------------- styling
TH = Side(style="thin", color="BFBFBF")
BOX = Border(left=TH, right=TH, top=TH, bottom=TH)
HDR = PatternFill("solid", fgColor="1F3864")
SUB = PatternFill("solid", fgColor="D9E1F2")
RED = PatternFill("solid", fgColor="FCE4E4")
GRN = PatternFill("solid", fgColor="E2EFDA")
AMB = PatternFill("solid", fgColor="FFF2CC")
INR = '#,##,##0.00;[Red]-#,##,##0.00;"-"'


def title(ws, text, sub=None):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=14, color="1F3864")
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(italic=True, size=9, color="595959")


def table(ws, row, headers, rows, widths=None, money=(), fills=None, wrap=()):
    for j, h in enumerate(headers, 1):
        c = ws.cell(row=row, column=j, value=h)
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = HDR
        c.alignment = Alignment(wrap_text=True, vertical="center")
        c.border = BOX
    for i, r in enumerate(rows, 1):
        for j, v in enumerate(r, 1):
            c = ws.cell(row=row + i, column=j, value=v)
            c.border = BOX
            c.alignment = Alignment(vertical="top", wrap_text=(headers[j - 1] in wrap))
            if headers[j - 1] in money:
                c.number_format = INR
            if fills and fills[i - 1] is not None:
                c.fill = fills[i - 1]
    if widths:
        for j, w in enumerate(widths, 1):
            ws.column_dimensions[get_column_letter(j)].width = w
    ws.freeze_panes = ws.cell(row=row + 1, column=1)
    return row + len(rows)


# ----------------------------------------------------------------- pending register
# Each row: (ref, category, item, period, working, amount, basis, stmt_check, stmt_ref,
#            mail_subject, last_mail, iml_contact, status_next_step)
NF = "Not found in statement"
PENDING = [
    # ---- monthly / quarterly scheme credit notes
    ("S1", "Monthly scheme CN", "Oct-26 monthly scheme CNs (A&W normal, A&W additional, ACC, secondary support)",
     "Oct-26", "IML computes on Oct primary and secondary. Sep-26 equivalent heads came to 4,18,628 net on 23 Oct.",
     None, "IML to compute", NF, "Last monthly set posted 23.10.26 (Sep-26 heads)",
     "Scheme letters Oct'26", "05 Oct 2026", "Abhishek Roshan", "Normally posted around the 23rd of the next month. Follow up if not in the statement by 30 Nov."),
    ("S2", "Tie-up CN", "Oct-26 ADD tie-up (primary, secondary, linearity)", "Oct-26",
     "Sep-26 tie-up came to 2,67,906.99 (posted 27.10.26).", None, "IML to compute", NF, "Last tie-up posted 27.10.26 (Sep-26)",
     "Oct'26 TOT Letter", "Oct 2026", "Abhishek Roshan", "Ask for the Oct-26 TOT working along with the monthly CNs."),
    ("S3", "Quarterly tie-up", "JAS-26 quarterly tie-up", "Jul-Sep 26",
     "AMJ-26 quarter tie-up was 1,72,264.30, posted 27.07.26 (about 4 weeks after quarter end).", None, "IML to compute", NF,
     "AMJ-26 found: DG 27.07.26 -1,72,264.30", "JASO'26 achievement mails", "30 Sep 2026", "Abhishek Roshan / Prateek Makhija",
     "Overdue. JAS quarter closed 30 Sep and nothing is posted by 16 Nov. Ask for the JAS working."),
    ("S4", "Additional scheme", "Dussehra additional scheme on PartyPal 450 and PP 700", "Oct-26",
     "Per unit support on PP450 / PP700 sold in the scheme window.", None, "Claim to be prepared", NF, "",
     "Fwd: Additional Dussehra Scheme : Partypal 450 & PP 700", "Oct 2026", "Abhishek Roshan", "Share PP450 / PP700 sell-in for the window and ask for the CN."),
    ("S5", "Additional scheme", "Diwali Bonanza additional support on PartyPal 450 and PP 700", "Oct-Nov 26",
     "Per unit support as per letter.", None, "Claim to be prepared", NF, "",
     "boAt-Offline : Diwali Bonanza Scheme : Additional Support on PartyPal 450 & PP 700", "Nov 2026", "Abhishek Roshan", "Claim after the scheme window closes."),
    ("S6", "Additional scheme", "Additional scheme on selected wearables SKUs", "Oct-26",
     "Per unit support on listed wearables.", None, "Claim to be prepared", NF, "",
     "Additional Scheme – Selected Wearables SKUs (Oct'26)", "Oct 2026", "Abhishek Roshan", "Check whether IML adds it to the Oct-26 additional primary CN."),
    ("S7", "Scheme check", "Aug-26 tie-up linearity reversed", "Aug-26",
     "DR 3106270271 of 4,349.30 on 24.09.26 recovered linearity and no Aug-26 linearity CN was issued.", 4349.30, "Firm (as per statement)",
     "Found: DR 24.09.26 +4,349.30", "DR 3106270271", "Aug'26 TOT/Tie-Up (Primary/Linearity & Secondary) CN Copies and Working Details",
     "Oct 2026", "Abhishek Roshan", "Check the Aug-26 linearity working. If the target was met, ask IML to reverse the DR."),
    ("S8", "Scheme check", "ACC heads not posted in some months", "Apr, Jun, Jul, Aug 26",
     "Apr-26 has no ACC normal or ACC additional CN. Jun, Jul and Aug 26 have no ACC additional CN.", None, "Confirm eligibility", NF, "",
     "SKU-Wise CN Copies & Working Details - Jun'26, Jul'26 & Aug'26", "Oct 2026", "Abhishek Roshan",
     "Check the SKU-wise workings. If ACC targets were met, these are short-paid."),
    ("S9", "Scheme CN (A/c 1100552)", "Primary and secondary support on account 1100552 from Apr-26", "Apr-26 onwards",
     "Last posting on this account was Mar-26 primary 1,08,413 and secondary 6,574.82 on 03.06.26. Nothing after that up to 22.09.26.",
     None, "IML to compute", NF, "Last found: DG / ZC 03.06.26", "SOA from Rohit Bhise", "22 Sep 2026", "Rohit Bhise",
     "Ask for the 1100552 statement after 22 Sep and the Apr-Sep 26 scheme working."),
    ("S10", "Document", "JFM-26 TOT working not shared", "Jan-Mar 26",
     "CNs posted (4,30,191.21 + 2,84,694.60 + 1,01,677.10) but the working sheet is still not received.", None, "No money due",
     "Found: DG 17.04.26", "DG 4106270xxx", "JFM'26 TOT working", "27 Jul 2026", "Abhishek Roshan", "Ask once more for the working."),

    # ---- claims
    ("C1", "Event CN", "Event free items, Chandigarh Sept 2024 (DN 1A 56,992 + DN 1B 14,777)", "FY24-25",
     "56,992 + 14,777", 71769.00, "Firm (Nalanda DN)", NF, "",
     "Request of Approval Pending Claim_ Nalanda Enterprises / Request for Issuance of Credit Note", "07 Oct 2026",
     "Abhishek Roshan", "Approval screenshot dated 22 Jan 2026 exists. IML wants the approval mail as an attachment. Send it and chase the CN."),
    ("C2", "Price difference", "BH220 price difference, invoice 9062521859", "Nov-24", "300 units x 75", 22500.00,
     "Firm (claim sheet)", NF, "", "BH220 price difference", "09 Dec 2025", "Bimal Singh", "No reply for almost a year. Escalate."),
    ("C3", "Short / price CN", "Airdopes 141 short CN", "Till Feb-26", "1,326 x 40", 53040.00, "Firm (claim sheet)", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Chase with the pendency sheet."),
    ("C4", "Short / price CN", "Avante Aspire", "Till Feb-26", "400 x 30", 12000.00, "Firm (claim sheet)", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Chase with the pendency sheet."),
    ("C5", "Short / price CN", "Airdopes 138", "Till Feb-26", "2,000 x 34", 68000.00, "Firm (claim sheet)", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Chase with the pendency sheet."),
    ("C6", "Short / price CN", "Nirvana Ion ANC (Jan)", "Jan-26", "150 x 50", 7500.00, "Firm (claim sheet)", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Chase with the pendency sheet."),
    ("C7", "Short / price CN", "Rockerz 109", "Till Feb-26", "5,000 x 20", 100000.00, "Firm (claim sheet)", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Chase with the pendency sheet."),
    ("C8", "Short / price CN", "PB331 (March)", "Mar-26", "Quantity and rate not in the sheet", None, "Amount to be filled", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Fill quantity and rate before chasing."),
    ("C9", "FOC scheme", "Nirvana 10+1 (Zenith Pro)", "Till Feb-26", "Free units not received", None, "Amount to be filled", NF, "",
     "Pendencies till Feb 2026", "04 Apr 2026", "Bimal Singh", "Fill units and value before chasing."),
    ("C10", "FOC scheme", "Hive Dashcam E1 10+1", "2026", "170 units bought, so 170 / 11 = 15 free units (not 17)", None,
     "Units firm, value to be filled", NF, "", "Hive dashcam E1 - 10+1 scheme pending", "22 Oct 2026", "Abhishek Roshan",
     "IML said they will check and revert. Value = 15 x landing price."),
    ("C11", "SubD 2%", "SubD 2% on Atul Communication (Sub-D) Jul to Nov 26", "Jul-Nov 26",
     "2% of Sub-D taxable 36,86,946 (see SUBD 2% tab)", 73738.92, "Computed from claim file", NF,
     "Previous claim settled: DG 29.07.26 -20,271.95", "SubD claim mail with sales Jun-Nov 26", "19 Nov 2026", "Abhishek Roshan",
     "Mail text says Rs. 39986517. That is the total sales value (39.99 L), not the CN. The CN is about 73.7 K."),
    ("C12", "Stock price support", "Narang / Spon stock transfer price support", "Oct-25",
     "Support on Stone 750, Rockerz 751 ANC, Avante Aura, Avante Quake, Airdopes 300 moved to Nalanda. Receivable shown 4,01,423, ledger balance 64,787.",
     401423.00, "Claimed, to be agreed", NF, "", "Price support / Narang stock transfer", "12 Jun 2026", "Atinder Singh",
     "Agree the final figure with IML. Not in the statement."),
    ("C13", "Trip / voucher", "FTS'25 Amsterdam trip", "FTS'25", "Non cash benefit", None, "Non cash", NF, "",
     "FTS'26 voucher Amsterdam", "07 Aug 2026", "Atinder Singh / Kushal", "Chase status."),

    # ---- Nalanda debit notes (Tally register mailed 23 Dec 2025)
    ("D1", "Nalanda DN", "DN 9 dated 08.05.2025", "May-25", "As per Tally DN register", 79549.00, "Firm (Nalanda DN)", NF, "",
     "DN register to Farhan Budhwani / DN May 2025 CN still pending", "24 Dec 2025", "Farhan Budhwani", "Chase CN."),
    ("D2", "Nalanda DN", "DN 58 dated 19.09.2025", "Sep-25", "As per Tally DN register", 74704.90, "Firm (Nalanda DN)", NF, "",
     "DN register to Farhan Budhwani", "24 Dec 2025", "Farhan Budhwani", "Chase CN."),
    ("D3", "Nalanda DN", "DN 70 dated 27.10.2025", "Oct-25", "Gross as per Tally DN register", 11122.69, "Firm (Nalanda DN)", NF, "",
     "DN register to Farhan Budhwani", "24 Dec 2025", "Farhan Budhwani", "Chase CN."),

    # ---- DOA / shortage
    ("R1", "DOA CN", "DN 45 and 47, docket 53669492413 (sent 09.07.26, received 13.08.26)", "Jul-26",
     "IBD 2051436936 and 2051438489", None, "Value as per DN copies", "Docket not found in statement", "",
     "Doa sent on 9/7/2026, docket no - 53669492413", "30 Oct 2026", "Mangesh Khade / Aniket Shirke",
     "IML confirmed on 30 Oct that the CN for IBD 2051438489 is still not issued. Chase."),
    ("R2", "DOA CN", "DN 61 to 65, docket 51987108342", "Aug-26",
     "5 IBDs processed. 3 CNs posted 28.08.26 for 29,795 + 66,940 + 5,002 = 1,01,737. Error-code items re-billed on new DN (29 Aug).",
     None, "Balance to be agreed", "Partly found: RV 28.08.26 -1,01,737", "Assignment 51987108342",
     "Debit note 61,62,63,64 & 65", "19 Nov 2026", "RC Offline / Abhishek Roshan", "Match the 3 CNs to the 5 DNs and chase the balance and the error-code DN."),
    ("R3", "DOA CN", "DN 50 and IBD 2051461273 (DN 90), docket 53671618070", "Sep-26",
     "DN 49, 51, 53 settled by CN of 3,38,315 on 16.09.26. DN 50 (IBD 2051441601) and IBD 2051461273 still open.", None,
     "Value as per DN copies", "Partly found: RV 16.09.26 -3,38,315", "Assignment 53671618070",
     "Acknowledgment the shipment | against Docket No. 53671618070 | DN No. 49, 51, 53", "23 Nov 2026", "Mangesh Khade / Akash Ubale",
     "IML asked for the DN copy again on 23 Nov and it was sent the same day. Chase CN."),
    ("R4", "DOA CN", "DN 74, docket 53684553742", "Sep-26",
     "3 CNs posted 26.09.26 for 1,61,328 + 15,338 + 1,03,649 = 2,80,315. DN 74 (IBD 2051444392) was processed after that (1 Oct).",
     None, "Value as per DN copy", "Partly found: RV 26.09.26 -2,80,315", "Assignment 53684553742",
     "Debit note 74,75,76,77 &78", "22 Oct 2026", "RC Offline / Mangesh Khade", "Check whether DN 74 CN is posted after 16 Nov."),
    ("R5", "Shortage CN", "Shortage DN 3 dated 16.04.2026, one product billed at Rs 1", "Apr-26",
     "CN received but one line rated at Rs 1. Difference to be credited.", None, "Difference to be computed", NF, "",
     "Shortage CN – Debit Note No. 3 dated 16/04/2026", "03 Oct 2026", "Bansraj Yadav / Akash Ubale",
     "IML says the DN on the portal has the wrong amount. Nalanda says the physical DN is correct. Needs a call."),
    ("R6", "DOA", "DOA challan IMGDOA2027 / box 7D002000059", "Oct-26", "Item scanned by mistake on 18 Sep, DOA raised on 17 Oct with old docket.",
     None, "Value as per challan", "Challan not found in statement (IMGDOA2025 also missing)", "",
     "DOA CHALLAN ID-IMGDOA2027 OR BOX ID-7D002000059", "19 Oct 2026", "Akash Ubale", "Meeting asked to be moved. Close it out."),
    ("R7", "Billing dispute", "12 DOA rejected-stock invoices billed in Sep-26, material not received", "Sep-26",
     "Invoice value 85,287 (see GSTR-2A tab). All 12 are debited in the statement.", 85287.00, "Firm (as per statement)",
     "Found: 12 RV debits Sep-26", "See GSTR-2A tab", "DOA Invoices Reflecting in GSTR-2A but Not Received", "20 Nov 2026",
     "Bansraj Yadav / Akash Ubale", "IML sent PODs on 20 Nov. Check them. If the stock really did not arrive, ask for CN or cancellation."),
]

# Items that were listed as pending earlier but are found in the statement
SETTLED = [
    ("Nalanda DN 1C (in lieu of DN 137 dt 14.01.25)", 122405.00, "RV 26.12.2025, assignment D3231630, -1,22,405", "Settled"),
    ("Nalanda DN 61 (FY25-26 series)", 293758.00, "Confirmed received in Oct 2025 in follow-up mail", "Settled as per mail"),
    ("Nalanda DN 62 (FY25-26 series)", 45583.46, "Confirmed received in Oct 2025 in follow-up mail", "Settled as per mail"),
    ("SubD 2% Oct-25 to Jun-26 (Gupta Electronics 19,923.73 + Atul 348.21)", 20271.95, "DG 29.07.2026 -20,271.95", "Settled"),
    ("SubD 2% up to Sep-25", 36385.00, "DG 19.12.2025 -36,385", "Settled"),
    ("Short material, invoice 9062730103", 7462.00, "RV 06.11.2026 -7,462 (CN 7062703702)", "Settled"),
    ("Shortage dispute DN 17-21, docket 51617027346", 378697.00, "RV 29.06.26 -1,44,830 -60,551 -1,08,961 and 04.08.26 -64,355", "Settled"),
    ("Jul-26 price difference", 67981.08, "DG 27.08.2026 -67,981.08", "Settled"),
    ("Demo PP700 scheme", 35209.48, "DG 29.07.2026 -35,209.48", "Settled"),
    ("Jun-26 Cinehead E1 demo", 3101.59, "DG 23.07.2026 -3,101.59", "Settled"),
    ("AMJ-26 quarter tie-up", 172264.30, "DG 27.07.2026 -1,72,264.30", "Settled"),
    ("ASO-25 Q1 tie-up", 87582.50, "DG 29.07.2026 -87,582.50", "Settled"),
    ("JFM-26 TOT primary, secondary, linearity", 816562.91, "DG 17.04.2026 (posted, reversed by DR, reposted)", "Settled"),
    ("Mar-26 secondary support", 293900.32, "CN 21.05.2026 -2,93,900.32", "Settled"),
    ("DN 49, 51, 53 (docket 53671618070)", 338315.00, "RV 16.09.2026 -3,38,315", "Settled"),
    ("DN 75 to 78 (docket 53684553742)", 280315.00, "RV 26.09.2026 -1,61,328 -15,338 -1,03,649", "Settled"),
]

CORRECTIONS = [
    ("SubD claim", "Shown as Rs 39.9 L pending", "39.99 L is Sub-D sales value. CN at 2% on Sub-D taxable Jul-Nov 26 is about Rs 73,739."),
    ("Hive Dashcam E1 10+1", "17 free units", "170 units / 11 = 15 free units."),
    ("Event CN", "Shown as received / partly settled", "Rs 71,769 (56,992 + 14,777) is still not in the statement. IML asked for the approval mail on 7 Oct 2026."),
    ("DN 1C 1,22,405", "Shown as pending", "Settled. RV -1,22,405 on 26.12.2025 against assignment D3231630."),
    ("GSTR-2A list of 16 invoices", "All 16 treated as DOA rejected stock", "Only 12 (Rs 85,287) are DOA stock. 3 are the Aug-26 scheme DN lines (225.01, 119.98, 7,324.67) and 1 is the Aug-26 linearity DR (4,349.30)."),
    ("Monthly scheme months", "Several months shown as pending", "Mar to Sep 26 monthly CNs and May to Sep 26 tie-ups are all in the statement. Pending starts from Oct-26, plus JAS-26 quarter."),
]

GSTR2A = [
    ("9272733362", "01-09-2026", 16372.00, 2946.96, 19319.00, "DOA rejected stock"),
    ("9272733363", "01-09-2026", 2610.00, 469.80, 3080.00, "DOA rejected stock"),
    ("9272734525", "08-09-2026", 2643.00, 475.74, 3119.00, "DOA rejected stock"),
    ("9272734530", "08-09-2026", 3105.00, 558.90, 3664.00, "DOA rejected stock"),
    ("9272734548", "08-09-2026", 9424.00, 1696.32, 11120.00, "DOA rejected stock"),
    ("9272734569", "08-09-2026", 3107.00, 559.26, 3666.00, "DOA rejected stock"),
    ("9272737692", "21-09-2026", 1388.00, 249.84, 1638.00, "DOA rejected stock"),
    ("9272737693", "21-09-2026", 9300.00, 1674.00, 10974.00, "DOA rejected stock"),
    ("9272737703", "21-09-2026", 3440.00, 619.20, 4059.00, "DOA rejected stock"),
    ("9272737706", "21-09-2026", 10360.00, 1864.80, 12225.00, "DOA rejected stock"),
    ("9272737904", "22-09-2026", 7013.00, 1262.34, 8275.00, "DOA rejected stock"),
    ("9272738426", "23-09-2026", 190.69, 34.32, 225.01, "Scheme DN: Aug-26 ACC normal (1000000725)"),
    ("9272738494", "23-09-2026", 101.68, 18.30, 119.98, "Scheme DN: Aug-26 A&W additional (1000000727)"),
    ("9272738513", "23-09-2026", 6207.35, 1117.32, 7324.67, "Scheme DN: Aug-26 A&W normal (1000000726)"),
    ("9272741753", "29-09-2026", 3515.00, 632.70, 4148.00, "DOA rejected stock"),
    ("3106270271", "24-09-2026", 3685.85, 663.45, 4349.30, "Scheme DR: Aug-26 tie-up linearity reversal"),
]

SUBD = [  # month, Sub-D taxable (Atul Communication (Sub-D), code 90190), note
    ("Jun-26", 16038, "Already settled in IML working till Jun'26 (IML used 17,410.68)"),
    ("Jul-26", 19650, ""), ("Aug-26", 786292, ""), ("Sep-26", 1885966, ""),
    ("Oct-26", 749829, ""), ("Nov-26", 245209, "Part month as per claim file"),
]

EMAILS = [
    ("NALANDA ENTERPRISES from 01-04-25 to 22-09-26 SOA", "Rohit Bhise (IML)", "22 Sep 2026", "Statement", "SOA used for Apr-25 to Mar-26 and account 1100552"),
    ("Customer Report - 0001100164", "Rohit Bhise (IML)", "16 Nov 2026", "Statement", "FY26-27 ledger and overdue file"),
    ("Pendencies till Feb 2026", "Nalanda to Bimal Singh", "04 Apr 2026", "Claims", "C2 to C9"),
    ("DN register (Tally) to Farhan Budhwani", "Nalanda", "23 Dec 2025", "Nalanda DNs", "D1 to D3, C1, settled DN 1C / 61 / 62"),
    ("Request for Issuance of Credit Note / Request of Approval Pending Claim", "Nalanda / Abhishek Roshan", "07 Oct 2026", "Event CN", "C1"),
    ("Hive dashcam E1 - 10+1 scheme pending", "Abhishek Roshan", "22 Oct 2026", "FOC", "C10"),
    ("SUB D Claim Settlement till Jun'26", "IML", "19 Aug 2026", "SubD", "Settled part"),
    ("SubD sales Jun-Nov 26 claim", "Nalanda", "19 Nov 2026", "SubD", "C11"),
    ("FTS'26 voucher Amsterdam", "Nalanda / Atinder Singh", "07 Aug 2026", "Trip", "C13"),
    ("BH220 price difference", "Nalanda", "09 Dec 2025", "Price diff", "C2"),
    ("Debit note 61,62,63,64 & 65", "Nalanda / RC Offline", "19 Nov 2026", "DOA", "R2"),
    ("Debit note 74,75,76,77 &78", "Nalanda / RC Offline", "22 Oct 2026", "DOA", "R4"),
    ("Acknowledgment the shipment | Docket 53671618070 | DN 49, 51, 53", "Bansraj Yadav / Mangesh Khade", "23 Nov 2026", "DOA", "R3"),
    ("Doa sent on 9/7/2026, docket no - 53669492413", "Nalanda / Aniket Shirke", "30 Oct 2026", "DOA", "R1"),
    ("Shortage CN – Debit Note No. 3 dated 16/04/2026", "Nalanda / Bansraj Yadav", "03 Oct 2026", "Shortage", "R5"),
    ("DOA CHALLAN ID-IMGDOA2027 OR BOX ID-7D002000059", "Nalanda / Akash Ubale", "19 Oct 2026", "DOA", "R6"),
    ("DOA Invoices Reflecting in GSTR-2A but Not Received", "Nalanda / Bansraj Yadav", "20 Nov 2026", "Billing dispute", "R7"),
    ("'Credit Note/Debit Note agst' 0001100164 'from IML (Sep-26 tie-up advice)", "fico.sapsupport", "17 Nov 2026", "Scheme", "Sep-26 tie-up already posted 27.10.26; check if this is a revision"),
    ("Credit Note 7062703702-NALANDA ENTERPRISES", "basis.sapsupport", "Nov 2026", "Short material", "Settled 7,462"),
    ("SKU-Wise CN Copies & Working Details -Sep'26", "Abhishek Roshan", "Oct 2026", "Scheme", "Sep-26 monthly heads"),
    ("Aug'26 TOT/Tie-Up CN Copies and Working Details", "Abhishek Roshan", "Oct 2026", "Scheme", "S7"),
    ("SKU-Wise CN Copies & Working Details - Jun'26, Jul'26 & Aug'26", "Abhishek Roshan", "Oct 2026", "Scheme", "S8"),
    ("Scheme letters Nov'26 / Nov'26 TOT Letter-Star Partners", "offline schemes", "Nov 2026", "Scheme", "Next month accrual"),
    ("Additional Scheme – Selected Wearables SKUs (Oct'26)", "offline schemes", "Oct 2026", "Scheme", "S6"),
    ("Fwd: Additional Dussehra Scheme : Partypal 450 & PP 700", "offline schemes", "Oct 2026", "Scheme", "S4"),
    ("Diwali Bonanza Scheme-PartyPal 450 & 700", "offline schemes", "Nov 2026", "Scheme", "S5"),
    ("Combined all doa and schemes pending", "Nalanda", "30 Jun 2026", "Index", "Used as checklist of open issues"),
]


def main():
    d, stmt = load_ledger()
    wb = Workbook()

    # ------------------------------------------------ PENDING REGISTER
    ws = wb.active
    ws.title = "PENDING REGISTER"
    title(ws, "Nalanda Enterprises vs Imagine Marketing Ltd (boAt): pending schemes and credit notes",
          f"Every item checked against the IML statement as on {AS_ON}. Customer account 0001100164 (and 1100552). Amounts in Rs.")
    hdr = ["Ref", "Category", "Item", "Period", "Working", "Amount (Rs)", "Amount basis", "Statement check",
           "Statement ref", "Email subject", "Last mail", "IML contact", "Status / next step"]
    fills = [AMB if r[5] is None else RED for r in PENDING]
    end = table(ws, 4, hdr, PENDING, widths=[6, 18, 42, 13, 48, 14, 20, 26, 26, 44, 13, 22, 50],
                money=("Amount (Rs)",), fills=fills, wrap=("Item", "Working", "Status / next step", "Email subject", "Statement check", "Statement ref"))
    ws.cell(row=end + 2, column=5, value="Total quantified pending").font = Font(bold=True)
    c = ws.cell(row=end + 2, column=6, value=f"=SUM(F5:F{end})")
    c.number_format = INR
    c.font = Font(bold=True)
    ws.cell(row=end + 3, column=5, value="Items still needing an amount (yellow)").font = Font(bold=True)
    ws.cell(row=end + 3, column=6, value=f'=COUNTBLANK(F5:F{end})')

    # ------------------------------------------------ SCHEME GRID
    sc = d[d["DT"].isin(["CN", "DN", "DG", "DR", "ZC"]) & (d["Text"] != "")].copy()
    sc["Period"] = sc["Text"].apply(scheme_period)
    sc.loc[sc["Text"].str.upper().str.contains("TOT SUPPORT Q4"), "Period"] = "JFM-25"
    # SOA text is cut at 30 characters, so older rows lose the month. IML posts a month's
    # scheme in the following month, so take posting month minus one for those rows.
    miss = sc["Period"] == ""
    prev = (sc.loc[miss, "PD"] - pd.DateOffset(months=1)).dt.strftime("%b-%y").str.upper()
    sc.loc[miss, "Period"] = prev
    sc["Head"] = sc["Text"].apply(scheme_head)
    sc = sc[sc["Period"] != ""]
    g = sc.groupby(["Account", "Head", "Period"])["Amt"].sum().reset_index()

    def pkey(p):
        tag, yy = p.split("-")
        q = {"JFM": 3, "AMJ": 6, "JAS": 9, "OND": 12, "ASO": 10}
        m = MONTHS.get(tag, q.get(tag, 0))
        return int(yy) * 100 + m

    periods = sorted(g["Period"].unique(), key=pkey)
    periods = [p for p in periods if pkey(p) >= 2503]
    ws2 = wb.create_sheet("SCHEME GRID")
    title(ws2, "Scheme credit notes posted by IML, by month and head (net of scheme DNs)",
          "Source: IML SOA up to 22.09.26 and FY26-27 statement up to 16.11.26. Negative = credit to Nalanda. Blank = nothing posted. "
          "Where the SOA text is cut and has no month, the scheme month is taken as the month before posting.")
    r = 4
    for acct in [1100164, 1100552]:
        ga = g[g["Account"] == acct]
        if ga.empty:
            continue
        heads = sorted(ga["Head"].unique())
        cols = ["Account", "Head"] + periods + ["Total"]
        rows = []
        for h in heads:
            vals = []
            for p in periods:
                v = ga[(ga["Head"] == h) & (ga["Period"] == p)]["Amt"].sum()
                vals.append(round(v, 2) if v != 0 else None)
            rows.append([acct, h] + vals + [round(sum(x for x in vals if x), 2)])
        end = table(ws2, r, cols, rows, money=tuple(periods) + ("Total",))
        r = end + 3
    ws2.column_dimensions["A"].width = 10
    ws2.column_dimensions["B"].width = 28
    for j in range(3, 3 + len(periods) + 1):
        ws2.column_dimensions[get_column_letter(j)].width = 13
    ws2.freeze_panes = "C5"
    notes = ["Read the grid with these points:",
             "1. Oct-26 and Nov-26 columns do not exist yet because nothing is posted for them (S1, S2).",
             "2. JAS-26 quarter tie-up is missing; AMJ-26 was posted on 27.07.26 (S3).",
             "3. Aug-26 tie-up linearity shows a +4,349.30 debit with no credit (S7).",
             "4. May-26 monthly support came as slab DGs (SOA11 / SOB11) instead of the usual CN heads.",
             "5. Account 1100552 has nothing after Mar-26 (S9)."]
    for i, n in enumerate(notes):
        ws2.cell(row=r + i, column=2, value=n).font = Font(bold=(i == 0))

    # ------------------------------------------------ DOA & RETURNS
    ws3 = wb.create_sheet("DOA & RETURNS")
    title(ws3, "Return / DOA credit notes in FY26-27 statement (negative RV entries)",
          "Assignment holds the docket, DOA challan or invoice number. Use this to tick off each DN.")
    rv = d[(d["Account"] == 1100164) & (d["PD"] >= "2026-04-01") & (d["DT"] == "RV") & (d["Amt"] < 0)]
    grp = rv.groupby("Assignment").agg(First=("PD", "min"), Last=("PD", "max"), Lines=("Amt", "size"), CN=("Amt", "sum")).reset_index()
    rows = [[a, f.strftime("%d.%m.%Y"), l.strftime("%d.%m.%Y"), n, round(c, 2)] for a, f, l, n, c in grp.sort_values("First").values]
    end = table(ws3, 4, ["Assignment (docket / challan / invoice)", "First posting", "Last posting", "CN lines", "CN amount (Rs)"],
                rows, widths=[34, 14, 14, 10, 16], money=("CN amount (Rs)",))
    ws3.cell(row=end + 1, column=1, value="Total").font = Font(bold=True)
    c = ws3.cell(row=end + 1, column=5, value=f"=SUM(E5:E{end})")
    c.number_format = INR
    c.font = Font(bold=True)
    open_rows = [
        ["53669492413", "DN 45, 47", "Not in statement", "R1"],
        ["51987108342", "DN 61 to 65", "1,01,737 posted 28.08.26; balance open", "R2"],
        ["53671618070", "DN 49, 51, 53 / DN 50 / DN 90", "3,38,315 posted 16.09.26; DN 50 and DN 90 open", "R3"],
        ["53684553742", "DN 74 to 78", "2,80,315 posted 26.09.26; DN 74 open", "R4"],
        ["IMGDOA2025", "DOA challan", "Not in statement", "Check"],
        ["IMGDOA2027", "DOA challan / box 7D002000059", "Not in statement", "R6"],
    ]
    table(ws3, end + 4, ["Docket / challan", "Nalanda DNs", "Statement position", "Register ref"], open_rows)
    ws3.freeze_panes = "A5"

    # ------------------------------------------------ GSTR-2A
    ws4 = wb.create_sheet("GSTR-2A DISPUTE")
    title(ws4, "Sep-26 invoices in GSTR-2A that Nalanda says were not received",
          "From mail 'DOA Invoices Reflecting in GSTR-2A but Not Received'. Each line ticked to the statement.")
    rows = []
    for inv, dt, tx, ig, val, kind in GSTR2A:
        m = d[d["DocNo"] == inv]
        found = "; ".join(f"{t} {p:%d.%m.%Y} {a:,.2f}" for t, p, a in m[["DT", "PD", "Amt"]].values) or "Not found"
        rows.append([inv, dt, tx, ig, val, kind, found])
    end = table(ws4, 4, ["Invoice / doc no", "Date", "Taxable", "IGST", "Invoice value", "What it really is", "Found in statement"],
                rows, widths=[16, 12, 13, 12, 14, 44, 34], money=("Taxable", "IGST", "Invoice value"),
                fills=[RED if r[5].startswith("DOA") else GRN for r in rows])
    ws4.cell(row=end + 2, column=4, value="DOA rejected stock").font = Font(bold=True)
    c = ws4.cell(row=end + 2, column=5, value=f'=SUMIF(F5:F{end},"DOA*",E5:E{end})')
    c.number_format = INR
    ws4.cell(row=end + 3, column=4, value="Scheme DN / DR lines").font = Font(bold=True)
    c = ws4.cell(row=end + 3, column=5, value=f'=SUMIF(F5:F{end},"Scheme*",E5:E{end})')
    c.number_format = INR
    ws4.cell(row=end + 4, column=4, value="Total (16)").font = Font(bold=True)
    c = ws4.cell(row=end + 4, column=5, value=f"=SUM(E5:E{end})")
    c.number_format = INR

    # ------------------------------------------------ SUBD
    ws5 = wb.create_sheet("SUBD 2%")
    title(ws5, "SubD 2% claim: Atul Communication (Sub-D), outlet code 90190",
          "Taxable values from the Jun-Nov 26 sales file sent on 19 Nov 2026. IML settled up to Jun-26 (DG 29.07.26 -20,271.95).")
    rows = [[m, v, 0.02, None, n] for m, v, n in SUBD]
    end = table(ws5, 4, ["Month", "Sub-D taxable (Rs)", "Rate", "CN due (Rs)", "Note"], rows,
                widths=[10, 18, 8, 16, 52], money=("Sub-D taxable (Rs)", "CN due (Rs)"))
    for i in range(5, end + 1):
        ws5.cell(row=i, column=4, value=f'=IF(E{i}="",B{i}*C{i},0)').number_format = INR
        ws5.cell(row=i, column=3).number_format = "0%"
    ws5.cell(row=end + 1, column=1, value="Pending").font = Font(bold=True)
    for col in ("B", "D"):
        c = ws5[f"{col}{end + 1}"]
        c.value = f'=SUMIF(E5:E{end},"",{col}5:{col}{end})' if col == "B" else f"=SUM(D5:D{end})"
        c.number_format = INR
        c.font = Font(bold=True)
    ws5.cell(row=end + 3, column=1, value="Whole claim file is Rs 39,98,836 taxable (47,18,626 gross) across outlets. "
             "The mail says Rs 39986517, which is the sales value, not the credit note.")

    # ------------------------------------------------ SETTLED
    ws6 = wb.create_sheet("SETTLED (FOUND)")
    title(ws6, "Items found in the statement (taken off the pending list)")
    table(ws6, 3, ["Item", "Amount (Rs)", "Statement evidence", "Status"], SETTLED,
          widths=[52, 16, 60, 18], money=("Amount (Rs)",), fills=[GRN] * len(SETTLED))

    # ------------------------------------------------ CORRECTIONS
    ws7 = wb.create_sheet("CORRECTIONS")
    title(ws7, "What changed from the earlier sheet")
    table(ws7, 3, ["Item", "Earlier sheet said", "Correct position"], CORRECTIONS, widths=[30, 40, 90],
          wrap=("Correct position", "Earlier sheet said"))

    # ------------------------------------------------ TIE-OUT
    ws8 = wb.create_sheet("STATEMENT TIE-OUT")
    title(ws8, f"FY26-27 statement tie-out, account 0001100164, 01.04.2026 to {AS_ON}")
    labels = {"RV": "Invoices (net of return CNs)", "DZ": "Payments", "CN": "GST credit notes (monthly scheme)",
              "DG": "Credit notes (tie-up, TOT, slab, demo, price diff)", "DN": "Scheme debit notes", "DR": "Debit note reversals",
              "ZC": "Non-GST credit notes", "SA": "Adjustments", "AB": "Clearing", "ZA": "TDS / other"}
    mv = stmt.groupby("DT")["Amt"].agg(["size", "sum"]).reset_index()
    rows = [["Opening balance 01.04.2026", None, OPENING_FY27]]
    rows += [[f"{t}  {labels.get(t, t)}", int(n), round(s, 2)] for t, n, s in mv.values]
    end = table(ws8, 3, ["Line", "Entries", "Amount (Rs)"], rows, widths=[52, 10, 18], money=("Amount (Rs)",))
    ws8.cell(row=end + 1, column=1, value="Closing balance as per ledger").font = Font(bold=True)
    c = ws8.cell(row=end + 1, column=3, value=f"=SUM(C4:C{end})")
    c.number_format = INR
    c.font = Font(bold=True)
    od = pd.read_csv(DATA + "IML_Overdue_16Nov26.xls", sep="\t", encoding="utf-16")
    od_total = pd.to_numeric(od["Local Crcy Amt"].astype(str).str.replace(",", ""), errors="coerce").sum()
    ws8.cell(row=end + 2, column=1, value="Open items as per IML overdue statement 16.11.26")
    ws8.cell(row=end + 2, column=3, value=round(od_total, 2)).number_format = INR
    ws8.cell(row=end + 3, column=1, value="Difference").font = Font(bold=True)
    c = ws8.cell(row=end + 3, column=3, value=f"=C{end + 1}-C{end + 2}")
    c.number_format = INR
    c.font = Font(bold=True)
    ws8.cell(row=end + 5, column=1, value="Balance is a debit (Nalanda owes IML). Pending CNs in the register will reduce it once IML posts them.")
    ws8.cell(row=end + 6, column=1, value="Quantified pending CNs from the register").font = Font(bold=True)
    c = ws8.cell(row=end + 6, column=3, value="=SUM('PENDING REGISTER'!F5:F40)")
    c.number_format = INR
    ws8.cell(row=end + 7, column=1, value="Balance after quantified pending CNs").font = Font(bold=True)
    c = ws8.cell(row=end + 7, column=3, value=f"=C{end + 1}-C{end + 6}")
    c.number_format = INR

    # ------------------------------------------------ LEDGER (non-invoice)
    ws9 = wb.create_sheet("LEDGER CN-DN ROWS")
    title(ws9, "All credit note, debit note and adjustment rows used for the checks", "Invoices (positive RV) and payments are left out to keep it readable.")
    lg = d[~((d["DT"] == "RV") & (d["Amt"] > 0)) & (d["DT"] != "DZ")]
    rows = [[a, p.strftime("%d.%m.%Y"), t, n, s, round(m, 2), x, src] for a, p, t, n, s, m, x, src in
            lg[["Account", "PD", "DT", "DocNo", "Assignment", "Amt", "Text", "src"]].values]
    table(ws9, 4, ["Account", "Posting date", "Doc type", "Document no", "Assignment", "Amount (Rs)", "Text", "Source"],
          rows, widths=[10, 12, 8, 14, 16, 15, 36, 26], money=("Amount (Rs)",))

    # ------------------------------------------------ EMAILS
    ws10 = wb.create_sheet("EMAIL LOG")
    title(ws10, "Mails read for this working (Gmail, read only)")
    table(ws10, 3, ["Subject", "From / between", "Last date", "Type", "Used for"], EMAILS, widths=[70, 32, 14, 16, 50],
          wrap=("Subject", "Used for"))

    # ------------------------------------------------ SUMMARY (first)
    ws0 = wb.create_sheet("SUMMARY", 0)
    title(ws0, "IML pendency summary", f"Prepared {date.today():%d %b %Y}. Statement as on {AS_ON}.")
    cats = {}
    for p in PENDING:
        k = p[1]
        cats.setdefault(k, [0, 0, 0.0])
        cats[k][0] += 1
        if p[5] is None:
            cats[k][1] += 1
        else:
            cats[k][2] += p[5]
    rows = [[k, v[0], v[1], round(v[2], 2)] for k, v in cats.items()]
    end = table(ws0, 4, ["Category", "Open items", "Items without amount yet", "Quantified amount (Rs)"], rows,
                widths=[30, 12, 24, 22, 60], money=("Quantified amount (Rs)",))
    ws0.cell(row=end + 1, column=1, value="Total").font = Font(bold=True)
    for col in ("B", "C", "D"):
        c = ws0[f"{col}{end + 1}"]
        c.value = f"=SUM({col}5:{col}{end})"
        c.font = Font(bold=True)
        if col == "D":
            c.number_format = INR
    r = end + 3
    keys = [
        ("IML ledger balance 16.11.26 (debit)", "='STATEMENT TIE-OUT'!C" + str(ws8.max_row - 6)),
    ]
    facts = [
        "Ledger ties to IML's own open items list exactly (difference nil, see STATEMENT TIE-OUT).",
        "All monthly scheme CNs up to Sep-26 and tie-ups up to Sep-26 are posted. Pending scheme money starts from Oct-26.",
        "JAS-26 quarter tie-up is overdue and is the biggest scheme item without a number yet.",
        "Biggest firm claims not in the statement: Narang stock support 4,01,423, Rockerz 109 1,00,000, R7 DOA billing 85,287, DN 9 79,549, DN 58 74,704.90, SubD 73,738.92, Event CN 71,769.",
        "Yellow rows in PENDING REGISTER need a value from a DN copy or an IML working before they can be chased as a number.",
    ]
    ws0.cell(row=r, column=1, value="Key points").font = Font(bold=True, size=12)
    for i, f in enumerate(facts, 1):
        ws0.cell(row=r + i, column=1, value=f"{i}. {f}")
    for wsx in wb.worksheets:
        wsx.sheet_view.showGridLines = False
    wb.save(OUT)
    print("saved", OUT)
    # quick console check
    q = sum(p[5] for p in PENDING if p[5] is not None)
    print("pending items", len(PENDING), "quantified", round(q, 2))
    print("ledger closing", round(OPENING_FY27 + stmt["Amt"].sum(), 2), "open items", round(od_total, 2))
    print("unmapped heads", sc[sc["Head"] == "Other"]["Text"].unique()[:20])


if __name__ == "__main__":
    main()
