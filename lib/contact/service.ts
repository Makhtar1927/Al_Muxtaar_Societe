import fs from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'contact-messages.json');

function ensureStoreExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getAllContactMessages(): ContactMessage[] {
  ensureStoreExists();
  try {
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const list: ContactMessage[] = JSON.parse(raw);
    return list.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Erreur lecture contact-messages.json:', error);
    return [];
  }
}

export function saveContactMessage(msg: {
  name: string;
  phone: string;
  message: string;
}): ContactMessage {
  ensureStoreExists();
  const list = getAllContactMessages();
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: msg.name.trim(),
    phone: msg.phone.trim(),
    message: msg.message.trim(),
    status: 'unread',
    created_at: new Date().toISOString(),
  };

  list.unshift(newMsg);
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
  return newMsg;
}

export function updateContactMessageStatus(
  id: string,
  status: ContactMessage['status'],
  notes?: string
): boolean {
  ensureStoreExists();
  const list = getAllContactMessages();
  const index = list.findIndex((m) => m.id === id);
  if (index === -1) return false;

  list[index].status = status;
  if (notes !== undefined) {
    list[index].notes = notes;
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
  return true;
}

export function deleteContactMessage(id: string): boolean {
  ensureStoreExists();
  const list = getAllContactMessages();
  const filtered = list.filter((m) => m.id !== id);
  if (filtered.length === list.length) return false;

  fs.writeFileSync(FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}

