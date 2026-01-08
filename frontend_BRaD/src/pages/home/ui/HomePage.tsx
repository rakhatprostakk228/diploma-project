import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { Hero } from '@widgets/hero';
import { Opportunities } from '@widgets/opportunities';
import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      <main>
        <Hero />
        <Opportunities />
      </main>
      <Footer />
    </div>
  );
};

