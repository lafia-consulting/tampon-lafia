# Générateur de tampon digital pour Lafia Consulting

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# Execute with serverless function
$ vercel dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Tampon digital

L'idée est de pouvoir générer un *tampon digital* à partir d'informtions saisies dans un champ de formulaire.
Ensuite, vous pourrez télécharger la sortie du formulaire en tant que image, que vous pourrez inclure directement dans vos documents administratifs.

De préférence, les téléchargement des images se fera au format **PNG**, pour avoir des images avec des fond transparent.

Pour implementer cela, plusieurs options s'offre à nous :
- Passer par l'API Canvas 
- Utiliser des librairies

### Lancer le serveur de developpement
Pour pouvoir tester les fonction serverless via **vercel**, il faut lancer le server de developpement avec la commande suivante

### API Canvas 

La balise **canvas** peut être utilisé pour faire des compositions de photos et dessiner des graphique en **2d**, et de les télécharger ensuite. Il est supporté par la plupart des versions les plus récentes des principaux navigateurs.
Afin de dessiner des graphiques sur canvas, nous utilisons un objet de *contexte JavaScript*, qui crée des graphiques à la volée.

#### Exemple d'utilisation

Nous allons tenter de l'implementer dans projet *Nuxt.JS*

**Définir les champs du formulaire**

```js
data() {
    return {
        company_name: '',
        commercial_name: '',
        siret: '',
        address: '',
        phone_number: '',
        canvas: null,
        ctx: null,
    }
}
```

**Au chargement de la page nous allons instancier notre canvas et son contexte**

```js
mounted() {
    this.canvas = document.getElementById('tampon');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.font = "1.5rem Rubik";
    this.ctx.textAlign = "center";

    // Ajout de police personnalisée
    let font = new FontFace(
        'Rubik',
        "url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap')"
    );

    font.load().then((f) => {
        document.fonts.add(f);
        this.ctx.font = '1.5rem Rubik'
    });
},
```

**Méthode pour mettre à jour nos data**

Nous allons ajouter un écouteur d'événement sur nos champs de formulaire **input** et écouter l'événement **@click**, pour mettre à jour le contenu du context de canvas.

```js
methods: {
    editCompanyName() {
        this.ctx.fillText(this.company_name, 10, 50);
    },
    editSiret() {
        this.ctx.fillText(this.siret, 10, 90);
    },
    editAddress() {
        this.ctx.fillText(this.address, 10, 120);
    },
    editPhoneNumber() {
        this.ctx.fillText(this.phone_number, 10, 150);
    },
    download(e) {
        let target = e.currentTarget;

        target.href = this.canvas.toDataURL();
        target.download = 'mon-tampon.png';
    }
}
```

Cette méthode fonctionne bien, même si on écrit beaucoup de code pour peu. Cela devient d'autant plus vrai lorsqu'on voudrait perssonnalisé des attributs tels que le positionnement de tel ou tel texte, ajouter des polices personnalisées depuis *Google Fonts* par exemple, centrer le contenu de notre canvas, appliquer des propriétés CSS par dessus. 

Même si cela reste néanmoins possible, nous allons priviligiés une autre solution plus simple.

## Utiliser des librairies

Quoi de plus simple que de passer par des bibliothèques qui nous mâchent le travail, pas besoin de réinventer la roue.

### DOM to image

C'est une librairies écrite en Javascript qui permet de transformer un noeud DOM en une image.
[https://github.com/tsayen/dom-to-image](https://github.com/tsayen/dom-to-image)

Ensuite  pour télécharger l'image que nous venons de créer **DOM to image** utilise une dépendance d'une autre librairies.
[https://github.com/eligrey/FileSaver.js/](https://github.com/eligrey/FileSaver.js/)


```
    saveAs(blob, 'tampon.png');
```

Permet de faire télécharger l'image depuis le navigateur.

Il suffit d'importer ces deux libs dans votre code et d'utiliser les méthode qu'elle propose. Vous pouvez vous aider la documentation sur Github de chacun d'eux.

**En bonus**
[https://vincent7128.github.io/text-image/](https://vincent7128.github.io/text-image/)


**Amélioration**
- TODO: Renseigner le nom qu'il souhaite donner à son fichier
- TODO: Personnalisée la police
- TODO: Afficher message flash pour lui indeiquer qu'il recevra bien son tampon par mail
- TODO: Notifier Lafia que quelqu'un à télécharger un tampon sur le site et conserver ses informations

### Envoi de mail

[sending-emails-with-nuxt-js-the-easy-way](https://medium.com/codex/sending-emails-with-nuxt-js-the-easy-way-91a65963bb4)

Maintenant, on souhaite plus que l'utilisateur puisse télécharger directement son tampon même après avoir renseigner les informtions de son entreprise. Pour des raisons de prospections, ou veut recueillir leurs informations personnelles à travers une modale. Après avoir renseigner leur adresse email sur la modale de confirmation de reception de leur tampon, on le leur envoi par mail.

Pour l'envoi de mail, nous utiliserons le package **nodemailer**.
[https://nodemailer.com/about/](https://nodemailer.com/about/)

Ensuite, nous passons par du serverless du côté de Vercel pour pouvoir utiliser notre module d'envoi d'email.

**Busboy** nous a permit de récupérer et de traiter les données envoyés depuis les *formData*, données qu'on transmet au backend de notre serverless.

#### Sendinblue
[how-to-send-email-in-nodejs/](https://schadokar.dev/posts/how-to-send-email-in-nodejs/)

#### Gérer les messages flash
[VueJS Flash message](https://laravel-news.com/building-a-flash-message-component-with-vue-js-and-tailwind-css)