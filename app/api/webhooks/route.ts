import { Webhook, WebhookEvent } from 'svix';
import { supabaseClient } from '../../../utils/supabaseClient';  // Correct path to your Supabase client

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  // Check for Webhook Secret
  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET not set in environment variables');
  }

  // Extract webhook headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // Validate presence of necessary headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing necessary webhook headers', { status: 400 });
  }

  // Parse the request payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initialize webhook verification
  const webhook = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Process 'user.created' webhook event
  if (event.type === 'user.created') {
 const { id, first_name, last_name, email_addresses, primary_email_address_id, phone_number, last_sign_in_at,primary_phone_number_id,profile_image_url, password_enabled, updated_at, birthday } = event.data;
const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id)?.email_address;

// Extract the primary email ID if needed (it seems you already have `primary_email_id` directly from `event.data`)
const primaryEmailID = primary_email_address_id; // This is probably redundant if `primary_email_id` is already defined


  const { data, error } = await supabaseClient
    .from('users')
    .upsert({  // The upsert method automatically handles the insert or update
      user_id: id,
      first_name: first_name,
      last_name: last_name,
      email: primaryEmail,
      primary_email_id: primaryEmailID,
      phone_number: phone_number,
      primary_phone_number_id: primary_phone_number_id,
      last_sign_in_at: new Date(last_sign_in_at).toISOString(),  // Assuming last_sign_in_at is a timestamp
      password_enabled: password_enabled,
      profile_image_url: profile_image_url,
      updated_at: new Date(updated_at).toISOString(),  // Assuming updated_at is a timestamp
      birthday: birthday ? new Date(birthday).toISOString() : null  // Convert birthday to ISO string if not null
    }, {
      returning: "minimal",  // Optional: Do not return data in response to speed up the request
      onConflict: "user_id"  // The unique constraint column, used to trigger the update
    });

    if (error) {
      console.error('Failed to insert data into Supabase:', error);
      return new Response('Database insertion error', { status: 500 });
    }

    console.log('Successfully inserted user into Supabase:', data);
    return new Response(JSON.stringify(data), { status: 200, headers: {
      'Content-Type': 'application/json'
    }});
  } else if (event.type === 'user.deleted') {
    // New logic to handle user deletion
    const { id } = event.data;  // Assuming `id` is the field containing the user ID
    console.log(id)
    const { data, error } = await supabaseClient
      .from('users')
      .delete()
      .match({ user_id: id });  // Assuming 'user_id' is the field name in your Supabase table

    if (error) {
      console.error('Failed to delete user from Supabase:', error);
      return new Response('Database deletion error', { status: 500 });
    }

    console.log('Successfully deleted user from Supabase:', data);
    return new Response(JSON.stringify(data), { status: 200, headers: {
      'Content-Type': 'application/json'
    }});
  }

  return new Response('Webhook processed', { status: 200 });
}
