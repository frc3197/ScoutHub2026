import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EVENT_KEY } from '../EVENT_KEY';
import { supabase } from '../supabase';
import PitTeam from '../util/pit-team';

const HomeScreen = () => {

  const teams = useTeamList(EVENT_KEY);
  const pitScoutedTeams = usePitScoutedTeams();
  const teamsWithImages = useTeamsWithImages();
  console.log(teamsWithImages);

  const [manualTeamNumber, setManualTeamNumber] = useState<number>(9999);
  const [showManual, setShowManual] = useState<boolean>(false);

  const router = useRouter();

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText}>Pit, Practice, Pre Scouting Dashboard</Text>

        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 25, }}>
          <Text style={[styles.normalText, { marginBottom: 0, }]}>Quick options:</Text>
          <TouchableOpacity style={styles.matchButton}
            onPress={() => router.push('/pit/practice')}
          >
            <Text style={styles.buttonText}>Practice Scout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualButton} onPress={() => setShowManual(prev => !prev)}>
            <Text style={styles.buttonText}>Manual Team Pit/Pre/Image</Text>
          </TouchableOpacity>

          {showManual &&
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Text style={[styles.normalText, { marginBottom: 0, }]}>Set team # and manually scout:</Text>
              <TextInput keyboardType="number-pad" style={styles.input} onChangeText={(text) =>
                setManualTeamNumber(parseInt(text))
              }
                placeholderTextColor='grey'></TextInput>
              <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <PitTeam
                  key={manualTeamNumber}
                  number={(manualTeamNumber)}
                  pre={false}
                  pit={pitScoutedTeams.includes((manualTeamNumber))}
                  image={teamsWithImages.includes((manualTeamNumber))}
                />
              </View>
            </View>
          }
        </View>

        <Text style={styles.normalText}>Below is the team list with options to pre-scout, pit-scout, or take an image. The color of the button indicates status: grey if the team is already scouted or red if it requires scouting. Scouting a team multiple times may overrite data so make sure to coordinate who scouts which teams. </Text>

        <View style={styles.scrollViewContainer}>
          {teams.map(team => (
            <PitTeam
              key={team}
              number={parseInt(team)}
              pre={true}
              pit={pitScoutedTeams.includes(parseInt(team))}
              image={teamsWithImages.includes(parseInt(team))}
            />
          ))}
        </View>
      </ScrollView>

    </View >
  );
}


function usePitScoutedTeams() {
  const [teams, setTeams] = React.useState<number[]>([]);

  React.useEffect(() => {
    async function fetchPitScoutedTeams() {
      try {
        const {data, error} = await supabase.from('Pit Scouting').select('*');
        const scouted = data?.map((p) => p.team_number) ?? [];
        console.log(scouted)

        setTeams(scouted);
      } catch (error) {
        console.error('Error fetching pitScout teams:', error);
      }
    }

    fetchPitScoutedTeams();
  }, []);

  return teams;
}

function useTeamsWithImages() {
  const [teams, setTeams] = React.useState<number[]>([]);

  React.useEffect(() => {
    async function fetchPitScoutedTeams() {
      try {
        const { data, error } = await supabase.storage
          .from('robot-images')
          .list(EVENT_KEY);

          const results = data.map((t) => parseInt(t.name.replace('team', '')));

          setTeams(results);
      } catch (error) {
        console.error('Error fetching images of teams:', error);
      }
    }

    fetchPitScoutedTeams();
  }, []);

  return teams;
}

function useTeamList(eventKey = EVENT_KEY) {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/keys`,
          {
            headers: {
              'X-TBA-Auth-Key': 'sBluV8DKQA0hTvJ2ABC9U3VDZunUGUSehxuDPvtNC8SQ3Q5XHvQVt0nm3X7cvP7j',
            },
          }
        );

        const teamKeys = await response.json(); // ["frc254", "frc1678", ...]
        const numbersOnly = teamKeys
          .map(key => parseInt(key.replace("frc", ""), 10))
          .filter(n => !isNaN(n))
          .sort((a, b) => a - b); // Sort numerically

        setTeams(numbersOnly);
      } catch (error) {
        console.error("Error fetching TBA team list:", error);
      }
    };

    fetchTeams();
  }, [eventKey]);

  return teams;
}



const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 20,
    width: '50%',
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: '#FFF6EA',
    color: 'black',
  },
  matchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  manualButton: {
    backgroundColor: '#099237e8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 35,
    padding: 25,
    textAlign: 'center',
    width: '100%',
  },
  normalText: {
    fontSize: 22,
    padding: 15,
    textAlign: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    paddingBottom: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20,
    marginBottom: 50,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#FFF6EA',
    padding: 0,
  },
});

const handlePress = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    // Optionally, show an alert to the user
    // Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export default HomeScreen;