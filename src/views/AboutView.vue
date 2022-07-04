<template>
  <div class="about text-center">
    <br>
    <h1>Über dieses Projekt</h1>
    <p class="info-p info-p-narrow">Willkommen zu unserer kleinen interaktiven Rezeptsammlung, die wir im Rahmen des Kurses Webtechnologien an der HTW Berlin erstellt haben</p>
    <h3>Lass dich inspirieren...</h3>
    <div class="text-field-middle">
      <p class="info-p">Unter dem Reiter <router-Link class="Link" to="/ingredients">Zutaten</router-Link>
        kannst du alle Zutaten sehen, die bisher angelegt wurden. Dort kannst du auch auf einen Blick sehen,
        ob diese vegetarisch oder vegan sind. Nach diesen Kriterien kannst du auch über die Radio-Buttons filtern. Unter
        <router-link class="Link" to="/recipes">Rezepte</router-link>
        findest du alle Rezepte, die andere Nutzer schon geteilt haben.
        Jede Rezeptkarte beinhaltet eine Zusammenfassung mit
        Hinweis zum Ernährungsstil und der Anzahl der Portionen, für die das Rezept ausgelegt ist. Ein Klick auf
        "Rezept ansehen" zeigt dir zudem die Anleitung und benötigten Zutaten zum Nachkochen.
      </p>
      <p class="info-p">Sowohl Zutaten als auch Rezepte kannst ganz einfach mithilfe der Suchleisten durchsuchen.
        Sobald du etwas eingetippt hast, wird dir angezeigt, welche Namen deiner Suche.
      </p>
    </div>

    <h3>... und teile deine Kreativität</h3>
    <div class="text-field-middle">
      <p class="info-p">
        Lege über "Rezept hinzufügen" ein neues Rezept an, indem du einen Namen und eine Anleitung in die
        entsprechenden Textfelder schreibst und die Anzahl an Portionen angibst. Wähle eine erste Zutat aus dem
        Drop-Down-Menü und klicke auf "Ausgewählte Zutat hinzufügen", um Menge und Einheit für diese Zutat
        angeben zu können. Auf die selbe Weise kannst du alle Zutaten anlegen und "Rezept speichern", sobald es
        komplett ist.
      </p>
      <p class="info-p">
        Solltest du mit einem deiner Rezepte nicht mehr zufrieden sein, kannst du es über "Rezept löschen"
        einfach entfernen. Fehlt für dein Rezept noch eine Zutat, kannst du sie über "Zutat hinzufügen" ergänzen.
        Gib hierfür einfach einen Namen und die Information, ob sie vegetarisch oder vegan ist, an.
        <br> Für ausführlichere Informationen auf Englisch, sieh dir unser ReadMe auf
        <a href="https://github.com/leonkorth/recipe-management-app-frontend">GitHub</a> an.
      </p>

    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
@import "src/assets/style/overall.scss";

p.info-p{
  padding-right: 200px;
  padding-left: 200px;
  &-narrow {
     padding-right: 300px;
     padding-left: 300px;
   }
}
router-link {

  link: $nav-text;
}
a:any-link {
  color: #284a4a;
}
</style>
