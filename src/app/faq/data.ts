export const categories = [
  { id: 'punktabfrage', title: 'Punktabfrage', icon: '🟢' },
  { id: 'bussgeldrechner', title: 'Bußgeldrechner', icon: '🟡' },
  { id: 'was-ist-rechtly', title: 'Was ist Rechtly?', icon: '🔵' },
  { id: 'service-support', title: 'Service & Support', icon: '⚙️' },
  { id: 'bussgeld', title: 'Bußgeld', icon: '🧩' },
  { id: 'verkehrsunfall', title: 'Verkehrsunfall', icon: '🚗' },
  { id: 'kfzgutachten', title: 'Kfz‑Gutachten', icon: '🛠' },
  { id: 'ablauf', title: 'Ablauf & Plattform', icon: '🧭' }
];

export const faqItems: Record<string, { q: string; a: string }[]> = {
  punktabfrage: [
    { 
      q: 'Wie funktioniert die Punkteabfrage?', 
      a: 'Du reichst deine persönlichen Daten und ggf. Identifikationsnachweise über unser sicheres Formular ein. Unsere Lösung übermittelt eine offizielle Anfrage an das Kraftfahrt-Bundesamt (KBA) und liefert dir anschließend deine aktuelle Punktestand-Auskunft.'
    },
    { 
      q: 'Muss ich persönlich zur Behörde gehen?', 
      a: 'Nein. Der gesamte Vorgang läuft digital über uns. Du musst nicht selbst vor Ort erscheinen – wir übernehmen die Kommunikation mit der Behörde für dich.'
    },
    { 
      q: 'Wie lange dauert die Punkteabfrage?', 
      a: 'In der Regel bekommst du deine Auskunft innerhalb weniger Werktage. Verzögerungen können auftreten, wenn zusätzliche Überprüfungen oder Behördenschritte notwendig sind.'
    },
    { 
      q: 'Was kostet die Punkteabfrage?', 
      a: 'Für dich als Nutzer ist sie kostenfrei (im Rahmen des Rechtly-Angebots). Wir finanzieren die Abfrage über unsere Plattformkosten bzw. Partnerverträge.'
    },
    { 
      q: 'Welche Daten werden für die Abfrage benötigt?', 
      a: 'Typischerweise: Vor- & Nachname, Geburtsdatum, Adresse und ggf. Identitätsnachweis (z. B. Ausweiskopie), je nach Anforderungen des KBA.'
    },
    { 
      q: 'Wie oft kann ich die Punkteabfrage durchführen?', 
      a: 'Grundsätzlich so oft du willst. Allerdings hängt die Aktualisierung der gespeicherten Daten von der Behörde ab – neue Verstöße oder Eintragungen können noch in Bearbeitung sein.'
    },
    { 
      q: 'Ist die Auskunft verbindlich und aktuell?', 
      a: 'Sie stellt den offiziellen Stand beim KBA dar – allerdings kann sie mit Verzögerung aktualisiert sein, wenn ein neues Verfahren noch nicht eingepflegt wurde.'
    },
    { 
      q: 'Was passiert, wenn ich Fehler in der Auskunft erkenne?', 
      a: 'Du kannst uns kontaktieren. Wir unterstützen dich bei der Korrektur oder bei Einwänden – z. B. wenn Eintragungen zu Unrecht gemacht wurden oder unvollständig sind.'
    }
  ],
  
  bussgeldrechner: [
    { 
      q: 'Wie zuverlässig ist der Bußgeldrechner?', 
      a: 'Unser Rechner basiert auf dem aktuellen Bußgeldkatalog und berücksichtigt typische Parameter (z. B. Geschwindigkeitsüberschreitung, Ort). Er liefert eine Schätzung – kein rechtsverbindlicher Bescheid.'
    },
    { 
      q: 'Welche Faktoren beeinflussen das Ergebnis?', 
      a: 'z. B. Überschreitungshöhe, inner- vs. außerorts, ggf. Vorstrafen bzw. frühere Verstöße, Messgenauigkeit, Verfahrensdetails.'
    },
    { 
      q: 'Gibt es Unterschiede zwischen Verwarnung und Bußgeld?', 
      a: 'Ja. Ein Verwarnungsgeld ist eine mildere Form der Ahndung in geringerem Umfang. Wird es nicht akzeptiert oder bezahlt, folgt oft ein offizielles Bußgeldverfahren mit höherem Betrag und weiteren Folgen.'
    },
    { 
      q: 'Kann der tatsächliche Bußgeldbetrag abweichen?', 
      a: 'Ja, der tatsächliche Betrag kann höher oder niedriger sein – abhängig von Einzelfall-Faktoren, Messfehlern oder behördlichen Zuschlägen.'
    },
    { 
      q: 'Erhalte ich sofort eine Einschätzung?', 
      a: 'In der Regel ja – der Rechner zeigt dir sofort das geschätzte Ergebnis basierend auf deinen Eingaben.'
    },
    { 
      q: 'Was passiert, wenn ich Details weglasse oder ungenau angebe?', 
      a: 'Dann sinkt die Genauigkeit der Schätzung. Für eine valide Einschätzung solltest du alle relevanten Informationen so exakt wie möglich eingeben.'
    },
    { 
      q: 'Kann der Rechner einen Fahrverbot anzeigen?', 
      a: 'Ja – sofern aufgrund der Eingaben ein Fahrverbot laut Bußgeldkatalog möglich wäre, zeigt der Rechner diese Option an.'
    },
    { 
      q: 'Ist der Rechner gesetzlich anerkannt oder verbindlich?', 
      a: 'Nein. Er ist ein informatives Tool zur Orientierung. Du solltest bei Einsprüchen oder Zweifeln immer juristische Beratung heranziehen.'
    }
  ],
  
  'was-ist-rechtly': [
    { 
      q: 'Wer steckt hinter Rechtly?', 
      a: 'Rechtly ist eine digitale Plattform, die juristische Expertise mit Technologie verbindet. Hinter den Kulissen arbeiten Verkehrsrechtsanwälte, Entwickler, Data Scientists und Produktmanager zusammen.'
    },
    { 
      q: 'Ist Rechtly eine Anwaltskanzlei?', 
      a: 'Nein. Rechtly ist eine Plattform, kein klassisches Anwaltsbüro. Wir kooperieren mit spezialisierten Rechtskanzleien, die Fälle final juristisch betreuen.'
    },
    { 
      q: 'Wie funktioniert die Plattform technisch?', 
      a: 'Dein Fall wird digital eingegeben, automatisiert geprüft (KI / Logik), passend zu Partnern (Gutachtern, Anwälten) geleitet und über das System abgewickelt – mit Statusverfolgung und Kommunikationsfunktionen.'
    },
    { 
      q: 'Welche Partner arbeiten mit Rechtly zusammen?', 
      a: 'Kfz-Gutachter, spezialisierte Verkehrsrechtskanzleien, technische Dienstleister und ggf. Versicherungen oder Gutachternetzwerke.'
    },
    { 
      q: 'Ist meine Anfrage vertraulich?', 
      a: 'Ja. Wir verwenden sichere Verschlüsselung, DSGVO-konforme Prozesse und geben Daten nur im notwendigen Umfang an Partner weiter (z. B. Anwalt, Gutachter).'
    },
    { 
      q: 'Gibt es versteckte Kosten?', 
      a: 'Nein. Transparenz ist uns wichtig – du siehst alle Kosten, Provisionen oder Abzüge im Voraus.'
    },
    { 
      q: 'Wie schnell erhalte ich eine Rückmeldung?', 
      a: 'Meist binnen 24 bis 48 Stunden nach Einreichung – je nach Arbeitsaufwand und Partnerkapazität.'
    },
    { 
      q: 'Kann ich mehrere Fälle parallel bearbeiten lassen?', 
      a: 'Ja, du kannst mehrere Anfragen parallel stellen und den Status jeder einzeln einsehen.'
    }
  ],
  
  'service-support': [
    { 
      q: 'Wie erreiche ich den Support?', 
      a: 'Über E-Mail, Chat im Portal oder Telefon (sofern angegeben). Du findest Kontaktinformationen im Bereich „Support" oder „Kontakt".'
    },
    { 
      q: 'Wann ist der Support verfügbar?', 
      a: 'In der Regel werktags während der Geschäftszeiten, mit eventuell eingeschränkter Unterstützung am Wochenende.'
    },
    { 
      q: 'Bekomme ich persönlichen Ansprechpartner?', 
      a: 'Ja, je nach Fallgröße oder Status kann dir ein fester Ansprechpartner zugewiesen werden (Anwalt, Fallmanager).'
    },
    { 
      q: 'Wie schnell erfolgt eine Rückmeldung?', 
      a: 'Im Normalfall innerhalb von 24 Stunden. Für komplexe Fälle oder technische Rückfragen kann es etwas länger dauern.'
    },
    { 
      q: 'Gibt es eine Wissensdatenbank / Hilfeseiten?', 
      a: 'Ja – in unserem Portal findest du FAQs, Leitfäden, Glossar und ggf. Tutorial-Videos.'
    },
    { 
      q: 'Was passiert, wenn ein Problem technisch auftritt?', 
      a: 'Unsere IT-Abteilung prüft und behebt technische Fehler so schnell wie möglich. Weiterhin gibt es Supportprozesse zur Nachverfolgung.'
    },
    { 
      q: 'Ist telefonischer Support möglich?', 
      a: 'Ja, wenn dies in deinem Land oder deiner Region angeboten wird. Die Nummer findest du im Kontaktbereich.'
    },
    { 
      q: 'Kann der Support mich bei rechtlichen Fragen beraten?', 
      a: 'Der Support kann allgemeine Hinweise geben, aber für verbindliche juristische Beratung wird ein Rechtsanwalt beauftragt – dafür arbeiten wir mit Partnerkanzleien.'
    }
  ],
  
  bussgeld: [
    { 
      q: 'Wann lohnt sich ein Einspruch?', 
      a: 'Wenn Zweifel an Messmethodik, Beweislage oder Formfehlern bestehen – besonders bei hohen Summen, Punkten oder Fahrverbot.'
    },
    { 
      q: 'Wer zahlt die Bußgeldkosten?', 
      a: 'In einem erfolgreich angefochtenen Fall trägt oft die Gegenseite – ansonsten bleibt der Betroffene zahlungspflichtig.'
    },
    { 
      q: 'Wie funktioniert die Übermittlung des Bescheids?', 
      a: 'Der Bußgeldbescheid wird per Post zugestellt. Mit einem Einspruch stoppt man die Rechtskraft.'
    },
    { 
      q: 'Kann ich anonym Einspruch einlegen?', 
      a: 'Nein – dein Name muss im Verfahren bekannt sein, damit der Einspruch rechtswirksam ist.'
    },
    { 
      q: 'Was passiert bei Nichtzahlung?', 
      a: 'Es drohen Mahnverfahren, Vollstreckungsmaßnahmen und zusätzliche Kosten.'
    },
    { 
      q: 'Welche Frist gilt für den Einspruch?', 
      a: 'Du hast in der Regel 14 Tage ab Zustellung des Bescheids Zeit, Einspruch einzulegen.'
    },
    { 
      q: 'Kann ein Fahrverbot automatisch verhängt werden?', 
      a: 'Ja – bei bestimmten Verstößen (z. B. über 30 km/h innerorts) kann ein Fahrverbot Bestandteil des Bußgeldes sein.'
    },
    { 
      q: 'Was passiert nach einem erfolgreichen Einspruch?', 
      a: 'Der Bußgeldbescheid kann aufgehoben oder geändert werden. Gegebenenfalls werden Kosten erstattet.'
    }
  ],
  
  verkehrsunfall: [
    { 
      q: 'Was tun direkt nach dem Unfall?', 
      a: 'Absichern, Notruf wählen, Fotos & Zeugen sichern, Unfallbericht aufnehmen, Angaben notieren (Datum, Uhrzeit, Ort).'
    },
    { 
      q: 'Wer trägt die Kosten des Gutachtens?', 
      a: 'Bei unverschuldetem Unfall: in der Regel die gegnerische Haftpflichtversicherung. Bei Bagatellschäden kann es Ausnahmen geben.'
    },
    { 
      q: 'Muss ich direkt mit der Versicherung sprechen?', 
      a: 'Nein. Es ist oft besser, über Anwalt oder Plattform zu kommunizieren, um deine Rechte zu wahren.'
    },
    { 
      q: 'Wie lange dauert die Unfallabwicklung?', 
      a: 'Das hängt von Schuldfrage, Gutachten, Verhandlungen mit Versicherung und evtl. Gerichtsverfahren ab – meist Wochen bis Monate.'
    },
    { 
      q: 'Kann ich einen Mietwagen bekommen?', 
      a: 'In vielen Fällen ja – für die Dauer der Reparatur oder Ersatzbeschaffung kannst du Anspruch auf einen Mietwagen der Klassenstufe haben.'
    },
    { 
      q: 'Was ist Nutzungsausfall und wird er erstattet?', 
      a: 'Nutzungsausfall ist die Entschädigung für Fahrzeuge, die du wegen des Schadens nicht nutzen kannst. Ob und wieviel erstattet wird, hängt vom Fall und Vertrag ab.'
    },
    { 
      q: 'Was bedeutet merkantiler Minderwert?', 
      a: 'Der Wertverlust, der auch nach fachgerechter Reparatur erhalten bleibt, z. B. weil das Auto als Unfallfahrzeug gilt.'
    },
    { 
      q: 'Was ist die Schadensminderungspflicht?', 
      a: 'Du bist verpflichtet, den Schaden möglichst gering zu halten (z. B. keine Luxus-Mietwagen, Reparatur innerhalb des Rahmens).'
    }
  ],
  
  kfzgutachten: [
    { 
      q: 'Wie finde ich einen Gutachter?', 
      a: 'Über unsere Plattform erhältst du Vorschläge in deiner Region. Du kannst auswählen oder von uns automatisch den passenden Partner bekommen.'
    },
    { 
      q: 'Was kostet ein Kfz-Gutachten?', 
      a: 'Die Kosten variieren je nach Schaden, Fahrzeugtyp und Komplexität. Im unverschuldeten Fall übernimmt meist die Versicherung die Kosten.'
    },
    { 
      q: 'Wer darf ein Gutachten erstellen?', 
      a: 'Nur zertifizierte Kfz-Sachverständige mit entsprechender Qualifikation und Zulassung.'
    },
    { 
      q: 'Was ist ein Kurzgutachten / Kostenvoranschlag?', 
      a: 'Eine vereinfachte Variante, meist für kleinere Schäden. Es enthält aber weniger detaillierte Analysen als ein Vollgutachten.'
    },
    { 
      q: 'Bekomme ich das Gutachten digital?', 
      a: 'Ja – in der Regel als PDF im Portal, parallel zur Übergabe an Anwalt und Versicherung.'
    },
    { 
      q: 'Was ist Restwert / Wertverlust?', 
      a: 'Restwert: Betrag, den dein Fahrzeug im beschädigten Zustand noch erzielen kann. Wertverlust: Differenz zwischen vorherigem Marktwert und Marktwert nach Schaden.'
    },
    { 
      q: 'Kann ich vor Ort den Gutachter verlangen?', 
      a: 'Ja – viele Gutachter bieten mobile Begutachtung an (Haus- oder Werkstattbesuche).'
    },
    { 
      q: 'Was, wenn die Versicherung das Gutachten nicht anerkennt?', 
      a: 'Dann kann juristische Unterstützung notwendig sein – z. B. durch Einspruch oder Gutachterwechsel.'
    }
  ],
  
  ablauf: [
    { 
      q: 'Wie reiche ich meinen Fall ein?', 
      a: 'Über das digitale Formular im Portal: Daten eingeben, Dokumente hochladen, Anfrage abschicken.'
    },
    { 
      q: 'Was passiert nach dem Upload?', 
      a: 'Die Plattform führt eine automatische Prüfung durch (KI / Logik), teilt geeignete Partner zu und benachrichtigt dich.'
    },
    { 
      q: 'Wie sehe ich den Status meines Falls?', 
      a: 'Im User-Dashboard: mit Fortschrittsanzeige, Nachrichten, Meilensteinen, Dokumentstatus.'
    },
    { 
      q: 'Muss ich Unterlagen manuell nachreichen?', 
      a: 'In Einzelfällen ja, etwa bei zusätzlichen Fotos oder Gutachterfragen – du wirst benachrichtigt.'
    },
    { 
      q: 'Kann ich Fälle zurückziehen / ablehnen?', 
      a: 'Ja – du kannst jederzeit entscheiden, einen Fall nicht weiter verfolgen zu lassen (z. B. Ablehnung oder Rückzug).'
    },
    { 
      q: 'Wie funktioniert die Kommunikation?', 
      a: 'Du kannst direkt mit Anwalt, Gutachter und Support über das integrierte Messaging-Modul kommunizieren.'
    },
    { 
      q: 'Wer bezahlt Plattformgebühren / Provisionen?', 
      a: 'Die Plattform zieht ihre Gebühren bzw. Provisionen transparent ab – du siehst die Aufteilung in deinem Falldashboard.'
    },
    { 
      q: 'Gibt es Analyse- / Statistikfunktionen?', 
      a: 'Ja, du erhältst Auswertungen zu Fallzahlen, Erfolgsquoten, Einnahmen, Zeit bis Abschluss etc.'
    }
  ]
};