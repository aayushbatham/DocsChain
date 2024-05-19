const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
