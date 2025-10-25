import express from 'express';
import db from '../database.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM organizations ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ organizations: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM organizations WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json({ organization: row });
  });
});

router.post('/', (req, res) => {
  const { name, email, phone, address, website, description } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const sql = `INSERT INTO organizations (name, email, phone, address, website, description) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [name, email, phone, address, website, description], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Organization created successfully',
      id: this.lastID 
    });
  });
});

router.put('/:id', (req, res) => {
  const { name, email, phone, address, website, description } = req.body;
  
  const sql = `UPDATE organizations 
               SET name = ?, email = ?, phone = ?, address = ?, website = ?, description = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;
  
  db.run(sql, [name, email, phone, address, website, description, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json({ message: 'Organization updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM organizations WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json({ message: 'Organization deleted successfully' });
  });
});

export default router;
