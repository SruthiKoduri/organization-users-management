import express from 'express';
import db from '../database.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { organization_id } = req.query;
  
  let sql = `SELECT users.*, organizations.name as organization_name 
             FROM users 
             LEFT JOIN organizations ON users.organization_id = organizations.id`;
  let params = [];
  
  if (organization_id) {
    sql += ' WHERE users.organization_id = ?';
    params.push(organization_id);
  }
  
  sql += ' ORDER BY users.created_at DESC';
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

router.get('/:id', (req, res) => {
  const sql = `SELECT users.*, organizations.name as organization_name 
               FROM users 
               LEFT JOIN organizations ON users.organization_id = organizations.id
               WHERE users.id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: row });
  });
});

router.post('/', (req, res) => {
  const { organization_id, first_name, last_name, email, phone, role, department, status } = req.body;
  
  if (!organization_id || !first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Organization ID, first name, last name, and email are required' });
  }

  const sql = `INSERT INTO users (organization_id, first_name, last_name, email, phone, role, department, status) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [organization_id, first_name, last_name, email, phone, role, department, status || 'active'], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      if (err.message.includes('FOREIGN KEY constraint failed')) {
        return res.status(400).json({ error: 'Invalid organization ID' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'User created successfully',
      id: this.lastID 
    });
  });
});

router.put('/:id', (req, res) => {
  const { organization_id, first_name, last_name, email, phone, role, department, status } = req.body;
  
  const sql = `UPDATE users 
               SET organization_id = ?, first_name = ?, last_name = ?, email = ?, phone = ?, 
                   role = ?, department = ?, status = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;
  
  db.run(sql, [organization_id, first_name, last_name, email, phone, role, department, status, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

export default router;
