export const BUSINESS_HOURS = {
  lunch: { opens: '12:00', closes: '15:00' },
  dinner: { opens: '19:30', closesDisplay: '24:00', closesSchema: '00:00' },
  dinnerClosedDay: 'Tuesday',
} as const;
