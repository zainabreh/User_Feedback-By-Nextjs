import {
    Html,
    Head,
    Font,
    Preview,
    Section,
    Row,
    Heading,
    Text
} from '@react-email/components'

interface VerficationEmailProps {
    username:string,
    otp:string
}

export default function VerificationEmail({username,otp}:VerficationEmailProps){
    return(
        <Html lang='en' dir='ltr'>
            <Head>
                <title>Verification Code</title>
                <Font 
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url:"",
                    format:'woff2'
                }}
                fontWeight={400}
                fontStyle='normal'
                />
            </Head>
            <Preview>Here&apos;s you'r verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as='h2'>Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering.Please use the following verification 
                        code to complete you're registeration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>If you did not request this code, please ignore this email</Text>
                </Row>
            </Section>
        </Html>
    )
}