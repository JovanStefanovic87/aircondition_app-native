interface Image {
    name: string;
    image: any;
}

export class DeviceElementImage {
    private static images: Array<Image> = [
        {
            name: 'außenluftansaugung.png',
            image: require('../assets/images/elements/außenluftansaugung.png'),
        },
        {
            name: 'außenluftkanal.png',
            image: require('../assets/images/elements/außenluftkanal.png'),
        },
        {
            name: 'schalldämpfer.png',
            image: require('../assets/images/elements/schalldämpfer.png'),
        },
        {
            name: 'zuluftkanalint.png',
            image: require('../assets/images/elements/zuluftkanalint.png'),
        },
        {
            name: 'zuluftkanal.png',
            image: require('../assets/images/elements/zuluftkanal.png'),
        },
        {
            name: 'luftauslass.png',
            image: require('../assets/images/elements/luftauslass.png'),
        },
        {
            name: 'umluftansaugung.png',
            image: require('../assets/images/elements/umluftansaugung.png'),
        },
        {
            name: 'edverlegterkanal.png',
            image: require('../assets/images/elements/edverlegterkanal.png'),
        },
        {
            name: 'jalousieklappe.png',
            image: require('../assets/images/elements/jalousieklappe.png'),
        },
        {
            name: 'mischluftklappe.png',
            image: require('../assets/images/elements/mischluftklappe.png'),
        },
        {
            name: 'bypass.png',
            image: require('../assets/images/elements/bypass.png'),
        },
        {
            name: 'kreislaufverbudsystem.png',
            image: require('../assets/images/elements/kreislaufverbudsystem.png'),
        },
        {
            name: 'rotationswarm.png',
            image: require('../assets/images/elements/rotationswarm.png'),
        },
        {
            name: 'kreuzwermetauscher.png',
            image: require('../assets/images/elements/kreuzwermetauscher.png'),
        },
        {
            name: 'filterM5.png',
            image: require('../assets/images/elements/filterM5.png'),
        },
        {
            name: 'filterF7.png',
            image: require('../assets/images/elements/filterF7.png'),
        },
        {
            name: 'filterG4Arrow.png',
            image: require('../assets/images/elements/filterG4Arrow.png'),
        },
        {
            name: 'filterF9.png',
            image: require('../assets/images/elements/filterF9.png'),
        },
        {
            name: 'filterePM1-50.png',
            image: require('../assets/images/elements/filterePM1-50.png'),
        },
        {
            name: 'filterePM2,5-50.png',
            image: require('../assets/images/elements/filterePM2,5-50.png'),
        },
        {
            name: 'filterH13.png',
            image: require('../assets/images/elements/filterH13.png'),
        },
        {
            name: 'filterePM10-50.png',
            image: require('../assets/images/elements/filterePM10-50.png'),
        },
        {
            name: 'filterePM1-80.png',
            image: require('../assets/images/elements/filterePM1-80.png'),
        },
        {
            name: 'filtercoarse.png',
            image: require('../assets/images/elements/filtercoarse.png'),
        },
        {
            name: 'uv-lampe.png',
            image: require('../assets/images/elements/uv-lampe.png'),
        },
        {
            name: 'filterH11.png',
            image: require('../assets/images/elements/filterH11.png'),
        },
        {
            name: 'erhitzer.png',
            image: require('../assets/images/elements/erhitzer.png'),
        },
        {
            name: 'kühler.png',
            image: require('../assets/images/elements/kühler.png'),
        },
        {
            name: 'tropfenabsche.png',
            image: require('../assets/images/elements/tropfenabsche.png'),
        },
        {
            name: 'ventilator.png',
            image: require('../assets/images/elements/ventilator.png'),
        },
        {
            name: 'dampfbefeuch.png',
            image: require('../assets/images/elements/dampfbefeuch.png'),
        },
        {
            name: 'befeuchter.png',
            image: require('../assets/images/elements/befeuchter.png'),
        },
        {
            name: 'entfeuchter.png',
            image: require('../assets/images/elements/entfeuchter.png'),
        },
        {
            name: 'dummyelement.png',
            image: require('../assets/images/elements/dummyelement.png'),
        },
        {
            name: 'splitgerät.png',
            image: require('../assets/images/elements/splitgerät.png'),
        },
        {
            name: 'abluftanglage.png',
            image: require('../assets/images/elements/abluftanglage.png'),
        },
        {
            name: 'abluftkanal.png',
            image: require('../assets/images/elements/abluftkanal.png'),
        },
        {
            name: 'behandlugszone.png',
            image: require('../assets/images/elements/behandlugszone.png'),
        },
        {
            name: 'umluftkuhlgerat.png',
            image: require('../assets/images/elements/umluftkuhlgerat.png'),
        },
        {
            name: 'füllkörper.png',
            image: require('../assets/images/elements/füllkörper.png'),
        },
        {
            name: 'berieselungd.png',
            image: require('../assets/images/elements/berieselungd.png'),
        },
        {
            name: 'becken.png',
            image: require('../assets/images/elements/becken.png'),
        },
        {
            name: 'abluftgitterdig.png',
            image: require('../assets/images/elements/abluftgitterdig.png'),
        },
        {
            name: 'filterdigestori.png',
            image: require('../assets/images/elements/filterdigestori.png'),
        },
        {
            name: 'abluftkanaldig.png',
            image: require('../assets/images/elements/abluftkanaldig.png'),
        },
        {
            name: 'frontschieber-01.png',
            image: require('../assets/images/elements/frontschieber-01.png'),
        },
        {
            name: 'abstellplatz.png',
            image: require('../assets/images/elements/abstellplatz.png'),
        },
        {
            name: 'gefahrstoffschran.png',
            image: require('../assets/images/elements/gefahrstoffschran.png'),
        },
    ];

    public static GetImage = (name: string) => {
        const found = DeviceElementImage.images.find((e) => e.name === name);
        return found ? found.image : require('../assets/images/elements/unknown.png');
    };
}
