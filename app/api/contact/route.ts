import { NextRequest, NextResponse } from 'next/server';
import {
  getAllContactMessages,
  saveContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} from '@/lib/contact/service';
import { createClient } from '@/lib/supabase/server';

// POST public : un visiteur soumet le formulaire de contact
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, téléphone, message) sont obligatoires.' },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, '').length < 8) {
      return NextResponse.json(
        { error: 'Veuillez saisir un numéro de téléphone valide.' },
        { status: 400 }
      );
    }

    const saved = saveContactMessage({ name, phone, message });

    return NextResponse.json(
      { success: true, message: 'Message reçu avec succès.', data: saved },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur POST /api/contact:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l’envoi du message.' },
      { status: 500 }
    );
  }
}

// GET admin : récupérer la liste des messages
export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const messages = getAllContactMessages();
    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error('Erreur GET /api/contact:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

// PATCH admin : modifier le statut (unread, read, replied, archived)
export async function PATCH(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID et statut requis.' }, { status: 400 });
    }

    const ok = updateContactMessageStatus(id, status, notes);
    if (!ok) {
      return NextResponse.json({ error: 'Message non trouvé.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

// DELETE admin : supprimer un message
export async function DELETE(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requis.' }, { status: 400 });
    }

    const ok = deleteContactMessage(id);
    if (!ok) {
      return NextResponse.json({ error: 'Message non trouvé.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}

