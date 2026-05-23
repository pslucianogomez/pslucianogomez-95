export interface ComingSoonGame {
  exe: string;
  tagline: { en: string; es: string };
  screen: string;   // ASCII / console-screen mock (shown when no image)
  image?: string;   // optional real screenshot path (overrides screen)
}

export const games: ComingSoonGame[] = [
  {
    exe: 'MATE.EXE',
    tagline: { en: 'The perfect cebador · timing', es: 'El cebador perfecto · timing' },
    screen: `C:\\PSLG> mate.exe
== EL CEBADOR ==
agua  [########--] 78C
yerba [#####-----] ok
combo x3     SCORE 420
[SPACE] cebar  _`,
  },
  {
    exe: 'GAUCHO.EXE',
    tagline: { en: 'Pampa runner', es: 'Aventura en la pampa' },
    screen: `C:\\PSLG> gaucho.exe
== EL GAUCHO ==
~~~~~~ la pampa ~~~~~~
   ,__o     dist 1240m
  /|  /\\    HP [#####-]
[A] facon  [D] rebenque`,
  },
  {
    exe: 'TRUCO.EXE',
    tagline: { en: 'Truco vs. the machine', es: 'Truco contra la máquina' },
    screen: `C:\\PSLG> truco.exe
== TRUCO ==
TU [1E][7E][3B]
EL [??][??][??]
"QUIERO RETRUCO!"
puntos  22 - 18  _`,
  },
  {
    exe: 'ASADO.SIM',
    tagline: { en: "Don't burn the tira", es: 'No quemes la tira' },
    screen: `C:\\PSLG> asado.sim
== ASADO MASTER ==
fuego )))((( brasas OK
tira  [==== medio ====]
vacio [== jugoso =====]
no lo quemes!  _`,
  },
];
