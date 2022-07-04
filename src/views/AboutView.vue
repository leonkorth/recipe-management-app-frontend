<template>
  <div class="about text-center">
    <h1>Hi,</h1>
    <p>Willkommen zu unserer kleinen interaktiven Rezeptsammlung,<br>die wir im Rahmen des Kurses Webtechnologien an der HTW Berlin erstellt haben</p>
    <h3>Lass dich inspirieren...</h3>
    <div id="text-field-middle">
      <p>Unter dem Reiter <router-Link class="Link" to="/ingredients">Zutaten</router-Link>
        kannst du alle Zutaten sehen, die bisher angelegt wurden. Dort kannst du auch auf einen Blick sehen,
        ob diese vegetarisch oder vegan sind. Nach diesen Kriterien kannst du auch über die Radio-Buttons filtern. Unter
        <router-link class="Link" to="/recipes">Rezepte</router-link>
        findest du alle Rezepte, die andere Nutzer schon geteilt haben.
        Jede Rezeptkarte beinhaltet eine Zusammenfassung mit
        Hinweis zum Ernährungsstil und der Anzahl der Portionen, für die das Rezept ausgelegt ist. Ein Klick auf
        "Rezept ansehen" zeigt dir zudem die Anleitung und benötigten Zutaten zum Nachkochen.
      </p>
      <p>Sowohl Zutaten als auch Rezepte kannst ganz einfach mithilfe der Suchleisten durchsuchen.
        Sobald du etwas eingetippt hast, wird dir angezeigt, welche Namen deiner Suche.
      </p>
    </div>

    <h3>...
      und teile deine Kreativität
    </h3>
  </div>
</template>

<script>

</script>

<style>
#text-field-middle{
  margin-right: 200px;
  margin-left: 200px;
}
</style>
