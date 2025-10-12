export const REPORT_DATA = {
    client: {
        name: 'ERLANGER STADTWERKE AG',
        address: 'ÄUSSERE BRUCKER STRASSE 33, 91052 ERLANGEN',
        endClient: 'ERLANGER STADTWERKE AG\nÄUSSERE BRUCKER STRASSE 33\n91052 ERLANGEN',
        endClientSignature: 'Christophe Lucereau',
        endClientAdress: 'ÄUSSERE BRUCKER STRASSE 33, 91052 ERLANGEN',
    },
    device: {
        location: 'Busbetriebshof',
        type: 'Anlage Umkleide/Waschräume',
        airVolume: 2000,
        constructionYear: 2012,
        lastMaintenance: '11/2020',
        id: '5b0692923cdeb',
    },

    inspection: {
        type: 'HYGIENEINSPEKTION VDI 6022',
        date: '01.12.2020',
        next: '01.12.2023',

        images: ['https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac'],
        stateImages: [
            {
                title: 'ANLAGE',
                imagePaths: [
                    'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
                ],
            },
        ],
    },
    elementState: [
        {
            elementTitle: 'AUßENLUFTANSAUGUNG',
            elementSymbolImage:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/zuluftkanal',
            imagePaths: [
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/images/industrial-ac',
            ],
            state: [
                {
                    groupTypeName: 'PHYSIKALISCH',
                    issues: [],
                },
                {
                    groupTypeName: 'KONSTRUKTIV',
                    issues: [
                        {
                            title: 'Gesamt',
                            value: 3,
                            valueText: 'NICHT EINSEHBAR',
                            comment:
                                ' Handlungsempfehlung : Revisionsöffnung herstellen (siehe Anmerkung 2)',
                        },
                        {
                            title: 'Gesamt',
                            value: 4,
                            valueText: 'NICHT EINSEHBAR 4',
                            comment: ' Handlungsempfehlung',
                        },
                        {
                            title: 'Anlage',
                            value: 2,
                            valueText: 'NICHT EINSEHBAR',
                            comment:
                                ' Handlungsempfehlung : Revisionsöffnung herstellen (siehe Anmerkung 2)',
                        },
                        {
                            title: 'Filter',
                            value: 4,
                            valueText: 'NICHT EINSEHBAR 4',
                            comment: ' Handlungsempfehlung',
                        },
                    ],
                },
            ],
        },
        {
            elementTitle: '',
        },
    ],

    created_on: '01.12.2020',
    elements: [
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftanglage',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftanglage',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftgitterdig',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftgitterdig',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftkanal',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanal',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftkanaldig',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanaldig',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abstellplatz',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abstellplatz',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Außenluftansaugung',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftansaugung',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Außenluftkanal',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftkanal',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftanglage',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftanglage',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftgitterdig',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftgitterdig',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftkanal',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanal',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abluftkanaldig',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abluftkanaldig',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Abstellplatz',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/abstellplatz',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Außenluftansaugung',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftansaugung',
        },
        {
            imageId: 'f15cd7de-7a12-4de4-bc3f-863dc177f167',
            imageTitle: 'Außenluftkanal',
            elementValues: {
                p: 1,
                k: 2,
                m: 1,
                l: 4,
            },
            imageDataUri:
                'https://ac-inspector-public.nbg1.your-objectstorage.com/ac/elements/außenluftkanal',
        },
    ],

    microbiology: {
        text: 'Messwerte Bestimmung der Gesamtkeimzahl durch Abklatschproben nach DIN 10113-3.\n\n< 25 G-KBE/25 cm2 : Der hygienisch-mikrobiologische Zustand der untersuchten Flächen ist als gut oder sehr gut zu bewerten.\nKein Handeln erforderlich.\n\n25 bis 99 G-KBE/25 cm2 : Der hygienisch-mikrobiologische Zustand der untersuchten Flächen ist als grenzwertig einzuschätzen.\nUrsache suchen, beseitigen.\nDiese Elemente sollen gründlich gereinigt oder demnächst ausgewechselt werden. In den Wartungsplan aufnehmen.\n\n>= 100 G-KBE/25 cm2 : Der hygienisch-mikrobiologische Zustand der untersuchten Flächen ist als unzureichend zu bewerten.\nUrsache suchen, beseitigen.\nDiese Elemente sollen dringend gründlich gereinigt, gegebenenfalls zusätzlich desinfiziert oder bei Bedarf ausgetauscht werden.\nSofortiges Handeln ist erforderlich.\n\nDie Platten entweder bis 100 G-KBE/Platte oder bis 300 G-KBE ausgezählt.\nJeweils die Summe der Platten für Bakterien und Pilze/Hefen, z.B. 20 KBE/25 cm2 Bakterien und 15 KBE/25 cm2 Pilze ergibt 35 G-KBE/25 cm2, das bedeutet eine Einordnung in die Kategorie 25 bis 99 G-KBE (G-KBE = Gesamtkeimzahl).\nn.b. (nicht beurteilbar) = wegen Überwucherung mit Bakterien ist keine Bestimmung möglich.\n\nBestimmung der Gesamtkeimzahl durch Abklatschproben nach DIN 10113-3 (CASO-Agar sowie bei Differenzierung DG 18-Agar auf Rodac-Platte).',
        labData: [
            {
                barcode: ' 2153844048127',
                elementName: 'Filter F7',
                zoneTitle: 'Gehäuse',
                'g-kbe': 17,
                mold: 3,
                yeast: 0,
                resultValue: 1,
            },
            {
                barcode: ' 2153844048128',
                elementName: 'Ventilator',
                zoneTitle: ' Schaufelrad',
                'g-kbe': 31,
                mold: 24,
                yeast: 0,
                resultValue: 2,
            },
        ],
    },
};
