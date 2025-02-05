import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { email, subscriptionType } = await request.json();

    const userDocRef = doc(db, "users", email);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      await setDoc(userDocRef, { subscriptionType }, { merge: true });
    } else {
      await setDoc(userDocRef, {
        email,
        subscriptionType,
        createdAt: serverTimestamp(),
      });
    }

    return NextResponse.json({ message: "Subscription updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 },
    );
  }
}
