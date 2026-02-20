export const formatValidationErrors = (errors) => {
if (!errors  || !errors.issues) return 'Unknown validation error';

if (Array.isArray(errors.issues)) return errors.issues.map(i => i.message).join(', ');

return JSON.stringify(errors);
}