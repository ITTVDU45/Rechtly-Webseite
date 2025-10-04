import React from 'react';
import { Metadata } from 'next';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen | Rechtly',
  description: 'Die allgemeinen Geschäftsbedingungen für die Nutzung der Dienstleistungen von Rechtly',
};

export default function AGBPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1B3A4B] to-[#2C5364] text-white py-24 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Allgemeine Geschäftsbedingungen</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a3e635] to-[#c7e70c] mx-auto mb-6"></div>
        </div>
      </section>

      {/* Content Section */}
      <Section className="section--white py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">1. Geltungsbereich</h2>
          <p className="mb-6">
            Die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Rechtsgeschäfte zwischen der QARA.LEGAL, vertreten durch Rechtsanwalt Zeynel Kara, Alfredstraße 81, 45130 Essen (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Nutzer"). Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">2. Vertragsgegenstand</h2>
          <p className="mb-6">
            2.1 Der Anbieter bietet über die Plattform "Rechtly" verschiedene rechtliche Dienstleistungen an, insbesondere im Bereich Verkehrsrecht, Bußgeldverfahren und KFZ-Gutachten.<br /><br />
            
            2.2 Die genaue Beschreibung der angebotenen Dienstleistungen ergibt sich aus den jeweiligen Leistungsbeschreibungen auf der Website des Anbieters.<br /><br />
            
            2.3 Der Anbieter behält sich das Recht vor, Dienstleistungen zu ändern, neue Dienstleistungen anzubieten und die Erbringung bestehender Dienstleistungen einzustellen.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">3. Vertragsschluss</h2>
          <p className="mb-6">
            3.1 Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe eines Angebots dar.<br /><br />
            
            3.2 Der Nutzer kann durch Ausfüllen und Absenden des Online-Formulars ein Angebot abgeben. Der Anbieter nimmt das Angebot durch ausdrückliche Bestätigung oder durch Beginn der Leistungserbringung an.<br /><br />
            
            3.3 Der Anbieter ist berechtigt, die Annahme des Angebots ohne Angabe von Gründen zu verweigern.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">4. Mitwirkungspflichten des Nutzers</h2>
          <p className="mb-6">
            4.1 Der Nutzer ist verpflichtet, alle für die Leistungserbringung erforderlichen Informationen und Unterlagen vollständig und wahrheitsgemäß zur Verfügung zu stellen.<br /><br />
            
            4.2 Der Nutzer hat sicherzustellen, dass die von ihm angegebenen Kontaktdaten zutreffend sind und er unter diesen erreichbar ist.<br /><br />
            
            4.3 Bei Änderungen der persönlichen Daten, insbesondere Name, Anschrift, E-Mail-Adresse oder Telefonnummer, ist der Nutzer verpflichtet, diese dem Anbieter unverzüglich mitzuteilen.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">5. Vergütung und Zahlungsbedingungen</h2>
          <p className="mb-6">
            5.1 Die Vergütung für die Dienstleistungen des Anbieters richtet sich nach der zum Zeitpunkt des Vertragsschlusses gültigen Preisliste oder individuellen Vereinbarungen.<br /><br />
            
            5.2 Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer, sofern nicht anders angegeben.<br /><br />
            
            5.3 Die Zahlung erfolgt je nach Vereinbarung per Überweisung, Lastschrift oder über einen Zahlungsdienstleister.<br /><br />
            
            5.4 Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig, sofern nicht anders vereinbart.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">6. Leistungserbringung und Termine</h2>
          <p className="mb-6">
            6.1 Der Anbieter erbringt die vereinbarten Leistungen mit der erforderlichen Sorgfalt und nach bestem Wissen und Gewissen.<br /><br />
            
            6.2 Termine für die Leistungserbringung sind nur verbindlich, wenn sie vom Anbieter ausdrücklich als verbindlich bestätigt wurden.<br /><br />
            
            6.3 Der Anbieter ist berechtigt, sich zur Erfüllung seiner vertraglichen Pflichten Dritter zu bedienen.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">7. Vertragsdauer und Kündigung</h2>
          <p className="mb-6">
            7.1 Die Vertragsdauer richtet sich nach der Art der in Anspruch genommenen Dienstleistung und wird im Einzelfall vereinbart.<br /><br />
            
            7.2 Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.<br /><br />
            
            7.3 Kündigungen bedürfen der Textform.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">8. Haftung</h2>
          <p className="mb-6">
            8.1 Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen.<br /><br />
            
            8.2 Für sonstige Schäden haftet der Anbieter nur, wenn sie auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Anbieters, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen.<br /><br />
            
            8.3 Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.<br /><br />
            
            8.4 Im Übrigen ist die Haftung des Anbieters ausgeschlossen.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">9. Datenschutz</h2>
          <p className="mb-6">
            9.1 Der Anbieter erhebt, verarbeitet und nutzt personenbezogene Daten des Nutzers nur im Rahmen der gesetzlichen Bestimmungen.<br /><br />
            
            9.2 Nähere Informationen zum Datenschutz sind in der Datenschutzerklärung des Anbieters enthalten.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">10. Gerichtsstand und anwendbares Recht</h2>
          <p className="mb-6">
            10.1 Für alle Rechtsbeziehungen zwischen dem Anbieter und dem Nutzer gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.<br /><br />
            
            10.2 Ist der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Geschäftssitz des Anbieters. Dasselbe gilt, wenn der Nutzer keinen allgemeinen Gerichtsstand in Deutschland hat oder Wohnsitz oder gewöhnlicher Aufenthalt im Zeitpunkt der Klageerhebung nicht bekannt sind.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mt-8 mb-4">11. Schlussbestimmungen</h2>
          <p className="mb-6">
            11.1 Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.<br /><br />
            
            11.2 Änderungen oder Ergänzungen dieser AGB bedürfen der Schriftform. Dies gilt auch für die Änderung dieser Schriftformklausel.
          </p>

          <p className="mt-10 text-sm text-gray-600">
            Stand: Oktober 2025
          </p>
        </div>
      </Section>
    </main>
  );
}
