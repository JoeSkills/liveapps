import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const mailChimpData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  try {
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID as string;
    const apiKey = process.env.MAILCHIMP_API_KEY as string;

    if (!audienceId || !apiKey) {
      throw new Error("Missing MailChimp API credentials");
    }

    const URL = `https://us17.api.mailchimp.com/3.0/lists/${audienceId}`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailChimpData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("blah blah causing my issues");
      const error = data.errors?.[0]?.error || "Unknown error occurred";
      return NextResponse.json({ error }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
