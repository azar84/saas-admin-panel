const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'design-system.db');
const db = new sqlite3.Database(dbPath);

// Update the existing configuration to use direct font names
const updateQuery = `
  UPDATE design_system_configs 
  SET typography = ? 
  WHERE id = 'e35cf00d-d17c-4145-9053-10b6a2081d6f'
`;

const newTypography = JSON.stringify({
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
});

db.run(updateQuery, [newTypography], function(err) {
  if (err) {
    console.error('Error updating database:', err);
  } else {
    console.log('Database updated successfully!');
    console.log('Rows affected:', this.changes);
  }
  db.close();
}); 