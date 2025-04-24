import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/app/components/SignOutButton';
import { styles } from './styles';
import { MainScreen } from '../components/MainScreen';
import { MyFooter } from '../components/MyFooter'
import { CardsScreen } from '../components/CardsScreen';

export default function Page() {
  const { user } = useUser();

  const logTest = true


  return (
    <View style={styles.container}>

      {logTest &&
        <View>
          <CardsScreen/>
        </View>
      }

      {!logTest && <View>

        <SignedIn>
          <Text style={styles.text}>
            Hello {user?.emailAddresses[0].emailAddress || "yupi@gmial.com"}
          </Text>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <MainScreen />
          <Link href="/(auth)/sign-in">
            <Text style={[styles.link, styles.signIn]}>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text style={styles.link}>Sign up</Text>
          </Link>
        </SignedOut>

        <MyFooter />




      </View>}



    </View>
  );
}
