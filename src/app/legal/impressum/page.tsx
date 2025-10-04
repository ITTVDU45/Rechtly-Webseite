import React from 'react';
import { Metadata } from 'next';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Impressum | Rechtly',
  description: 'Rechtliche Informationen und Kontaktdaten von Rechtly',
};

export default function ImpressumPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1B3A4B] to-[#2C5364] text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressum</h1>
        </div>
      </section>

      {/* Content Section */}
      <Section className="section--white py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Verantwortlich für die Inhalte:</h2>
          <p className="mb-6">
            <strong>Zeynel Kara<br />QARA.LEGAL<br />Alfredstraße 81<br />45130 Essen<br />Deutschland</strong>
          </p>
          <p className="mb-6">
            Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz:-Nr.: DE 309021035
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Zuständige Aufsichtsbehörde:</h2>
          <p className="mb-6">
            Rechtsanwaltskammer für den Oberlandesgerichtsbezirk Hamm:<br />Rechtsanwaltskammer Hamm, Ostenallee 18, 59063 Hamm.<br />
            Telefon: 02381 / 985000<br />Telefax: 02381 / 985050<br />E-Mail: info@rak-hamm.de<br />Internet: http://www.rechtsanwaltskammer-hamm.de
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Berufsbezeichnung:</h2>
          <p className="mb-6">
            Rechtsanwalt<br />Berufsbezeichnung verliehen in Deutschland
          </p>
          <p className="mb-6">
            Berufsrechtliche Regelungen:<br />Bundesrechtsanwaltsordnung (BRAO)<br />Berufsordnung der Rechtsanwälte (BORA)<br />Bundesrechtsanwaltsgebührenordnung (BRAGO)<br />Rechtsanwaltsvergütungsgesetz (RVG)<br />Fachanwaltsordnung (FAO)<br />Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE)<br />Geldwäschebekämpfungsgesetz (GwG)<br />(Anordnung der Bundesrechtsanwaltskammer nach § 14 Abs. 4 Satz 2 GwG)<br />Gesetz über die Tätigkeit europäischer Rechtsanwälte in Deutschland (EuRAG)<br />Bundesnotarordnung (BNotO)<br />Beurkundungsgesetz (BeurkG)<br />Kostenordnung (KostO)<br />Gesetz über die Kosten in Angelegenheiten der freiwilligen Gerichtsbarkeit<br />Dienstordnung für Notare (DONot)<br />Charta der Europäischen Berufsverbände zur Unterstützung der Bekämpfung der organisierten Kriminalität<br />Europäischer Kodex des notariellen Standesrechts (Übersetzung aus dem Französischen)<br />Richtlinienempfehlungen der Bundesnotarkammer<br />Richtlinien der Westfälischen Notarkammer (vormals Notarkammer Hamm)<br />Link: http://brak.de
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Außergerichtliche Streitschlichtung:</h2>
          <p className="mb-6">
            Email: info@rak-dus.de<br />Internet: https://www.rak-dus.de/<br />oder bei der Schlichtungsstelle der Rechtsanwaltschaft, die bei der Bundesrechtsanwaltskammer eingerichtet ist,<br />E-Mail: schlichtungsstelle@s-d-r.org | Internet: www.schlichtungsstelle-der-rechtsanwaltschaft.de.<br />Die Schlichtungsstelle der Rechtsanwaltschaft ist zugleich nach dem Verbraucherstreitbeilegungsgesetz (VSBG) die zuständige Verbraucherschlichtungsstelle für vermögensrechtliche Streitigkeiten aus dem Mandatsverhältnis bis zu einem Wert von 50.000,00 €.<br />Ihre Anschrift lautet:<br />Schlichtungsstelle der Rechtsanwaltschaft<br />Neue Grünstraße 17<br />10179 Berlin<br />Tel.: 030 – 284 44 17-0<br />Fax: 030 – 284 44 17-2<br />Als weitere Möglichkeit zur alternativen Streitbeilegung gibt es nach der EU-Verordnung über die Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung Online Dispute Resolution) die Plattform der EU zur außergerichtlichen Online-Streitbeilegung http://ec.europa.eu/consumers/odr/
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Berufshaftpflichtversicherung:</h2>
          <p className="mb-6">
            Rechtsanwalt Zeynel Kara führt eine Berufshaftpflichtversicherung bei der<br />Markel Insurance SE<br />Sophienstraße 26<br />80333 München.<br />Geltungsbereich: Deutschland<br />Rechtsanwältinnen, Rechtsanwälte und Notare sind aufgrund der Bundesrechtsanwaltsordnung verpflichtet, eine Berufshaftpflichtversicherung mit einer Mindestversicherungssumme von 250.000 Euro zu unterhalten.<br />Die Einzelheiten ergeben sich aus § 51 BRAO.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Hinweis gemäß Online-Streitbeilegungs-Verordnung</h2>
          <p className="mb-6">
            Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die Existenz der Europäischen Online-Streitbeilegungs-Plattform hinzuweisen, die für die Beilegung von Streitigkeiten genutzt werden kann, ohne dass ein Gericht eingeschaltet werden muss. Für die Einrichtung der Plattform ist die Europäische Kommission zuständig. Die Europäische Online-Streitbeilegungs-Plattform ist hier zu finden: http://ec.europa.eu/odr. Unsere E-Mail lautet: info@yst-recht.de<br />Wir weisen aber darauf hin, dass wir nicht bereit oder verpflichtet sind, uns am Streitbeilegungsverfahren im Rahmen der Europäischen Online-Streitbeilegungs-Plattform zu beteiligen. Nutzen Sie zur Kontaktaufnahme bitte unsere obige E-Mail und Telefonnummer.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-4">Disclaimer – Rechtliche Hinweise</h2>
          <p className="mb-6">
            <strong>§ 1 Warnhinweis zu Inhalten</strong><br />
            Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.<br />Bitte beachten Sie ferner, dass die angebotenen Hyperlinks in der Regel aus unserem Angebot herausführen. Daher können wir trotz sorgfältiger Prüfung keine Haftung für die verlinkten Inhalte übernehmen. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>

          <p className="mb-6">
            <strong>§ 2 Externe Links</strong><br />
            Diese Website enthält Verknüpfungen zu Websites Dritter („externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
          </p>

          <p className="mb-6">
            <strong>§ 3 Urheber- und Leistungsschutzrechte</strong><br />
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.<br />Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
          </p>

          <p className="mb-6">
            <strong>§ 4 Besondere Nutzungsbedingungen</strong><br />
            Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
          </p>
        </div>
      </Section>
    </main>
  );
}
