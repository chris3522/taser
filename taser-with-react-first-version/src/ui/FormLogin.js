import React from 'react'
import { Form } from 'semantic-ui-react'
import './../stylesheets/FormLogin.css'

const FormLogin = ( props ) => {
    const { taserId, users } = props 
    const { toggleAuth=f=>f } = props 
    const handleSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.target)
        const identifiant = data.get('identifiant')
        users.filter(u => u.name === identifiant)[0] ? toggleAuth(taserId,true) : toggleAuth(taserId,false)
    }

    return (
        <Form size='mini' onSubmit={ handleSubmit }>
           
            <Form.Input name="identifiant" placeholder='Entrer votre identifiant'/>
            <Form.Button type='submit' >Envoyer</Form.Button>
           
        </Form>
    )
}

export default FormLogin