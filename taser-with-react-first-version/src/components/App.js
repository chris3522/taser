import React from 'react'
import './../stylesheets/App.css'
import { TaserMultiWeeksContainer } from '../containers/TaserMultiWeeksContainer'
import { DaypickerCustomContainer } from '../containers/DayPickerCustomContainer'
import { InitContainer } from '../containers/InitContainer'
import { Container,Segment,Divider,Grid } from 'semantic-ui-react'
import { FormLoginContainer } from '../containers/FormLoginContainer'



const App = () => {
    return (
    <Container>
         <Segment basic textAlign='center'>
            <InitContainer/>
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        <div>
                        <p>Saisir les vacations ou les désidératas dans les cases du tableau</p>
                        <p>Désidératas en couleur : taper la shortkey "c" pour congés ou plusieurs fois la shortKey "x" pour afficher une couleur</p>
                        <p>Vacations en lettres  : taper une shortKey ("n" pour nuit Par, "j" pour jour Par, "b" pour bureau...) </p>
                        <p>La sauvegarde est automatique : effacer redux-store du localstorage du browser pour avoir une version à jour</p>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <DaypickerCustomContainer/>
                    </Grid.Column>
                    <Grid.Column>
                        <h1>Tableau de service</h1>
                        <p>login avec les noms du taser : "Lozach" par exemple</p>
                        <FormLoginContainer taserId="1"/>
                  </Grid.Column>
                </Grid.Row>
            </Grid>
          
            <Divider horizontal>And view</Divider>
            
            <TaserMultiWeeksContainer taserId="1"/>
            
        </Segment>
     </Container>
      
    )
}

export default App
