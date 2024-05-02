import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserDetails } from "./details";
import Link from "next/link";
import Image from "next/image";
import styles from "./Dashboard.module.css"; // Assume you have CSS module for styling

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
    return null;
  }

  const user = await clerkClient.users.getUser(userId);

  return (
    <div className={styles.dashboardContainer}>
      {user && (
        <>
          <h1 className={styles.welcomeText}>
            👋 Hi, {user.firstName || `Stranger`}
          </h1>
          <div className={styles.cardContainer}>
            <UserDetails />
            <div className={styles.card}>
              <Image
                src="/image.jpg"
                alt="Descriptive Alt Text"
                layout="responsive"
                width={500}
                height={300}
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Book Lab</h5>
                <p className={styles.cardText}>
                  Explore our labs and find the perfect spot for your next
                  project.
                </p>
                <Link href="/book-lab">
                  <p className={styles.btnPrimary}>Book Now</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
