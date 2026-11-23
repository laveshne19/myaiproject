# myaiproject

## Nalanda Enterprises vs Imagine Marketing (boAt): scheme and CN pendency

Main file: `Nalanda_IML_Scheme_Reconciliation.xlsx`, rebuilt by `python3 build_pendency_excel.py`.

Inputs sit in `data/`:
- `IML_SOA_01Apr25_to_22Sep26.xlsx` (SOA from IML, 22 Sep 2026)
- `IML_Statement_FY2627_upto_16Nov26.xls` (Customer Report 0001100164, 16 Nov 2026)
- `IML_Overdue_16Nov26.xls` (open items, 16 Nov 2026)

Tabs: SUMMARY, PENDING REGISTER, SCHEME GRID, DOA & RETURNS, GSTR-2A DISPUTE, SUBD 2%,
SETTLED (FOUND), CORRECTIONS, STATEMENT TIE-OUT, LEDGER CN-DN ROWS, EMAIL LOG.

The FY26-27 ledger closes at Rs 2,14,12,046.24, which matches IML's open items list exactly.
To refresh, drop the newer statement into `data/`, update the file names and `AS_ON` at the top of the script, and rerun.
