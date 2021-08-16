
This project was bootstrapped with [Expo](https://expo.io).

# Assignment report

## Environment pre-requirements
 - You need to have OS X (task was tested only with this OS)
 - Clone repo `git clone https://finn-gmbh-vezbji@git.codesubmit.io/finn-gmbh/wookie-movies-1-vezbji`
 - brew tap wix/brew
 - brew install --HEAD applesimutils
 - Unzip assignment.zip

## How to run

`npm start`

Starts expo UI with which you able to run the app in the ios or android simulator(or even web)<br>
After you run the command - the new tab in the browser will open.

`npm run ios`

Starts app in development mode in the ios simulator.

 `npm run android`

Starts app in development mode in the android simulator.

`npm run test`

Runs jest integration tests.

`npm run test:coverage`

Runs jest integration tests with coverage

`npm run test:e2e`

Runs e2e tests with detox

`npm run lint`

Lints codestyle in the project

### Deliverables

As described in README.md, you can also find assignment.zip and assignment.apk in order to test built versions of the app in the simulators

## How to build/publish

Expo is build/release manager in this task. You can read their [docs](https://docs.expo.io/) for details.

In short:
 - expo build:android -t simulator - builds for android simulator
 - expo build:ios -t simulator - builds for ios simulator

## Task

> ETA 5 hours

Check [README.MD](/README.md) to see full task description

### Main tasks:

#### Home screen 
- [x] Use API from the task description
- [x] Shows a list of movies grouped by genres
- [x] Allows to press on movie card and see movie details
- [x] Done according to design 

#### Movie details screen
- [x] Shows details about movie
- [x] Done according to design

#### Search screen
- [x] Allows filtering movies by name
- [x] Shows a list of filtered movies 
- [x] Allows navigating to movies details 

### Bonus tasks:
- [x] Support of multilocalization (formatjs)
- [x] On movies details screen user able to mark/unmark movie as favorite
- [x] Parallax effect on movies details screen with backdrop image
- [x] Loading, error, empty states for home screen, search screen and movie details screen 

## Architecture

## General note

As this is a test task for react-native position, the stack would be related to react, react-native and other similar things. In terms of motivation is react-native good choice or not - I would be happy to discuss during the next interview step - as the answer really depends on the future of the app and available resources.

### Template + Expo 

I decided to use expo.io as a generator for my react-native application. The main motivation for this: it allows you to not deal with infrastructure to build and run your app and as a result you able to save some time, they also provide an awesome developer experience. Also, expo allows you to extract and have vanilla react-native setup at any moment of time. From the downsides - performance will be a little bit worse in comparison to vanilla react-native setup, app size will be also bigger and in case if we decide to write some native code - it can be tricky.
In summary, from my perspective Expo is a good choice for such a small app in order to concentrate more on business logic.

### View + state management

We use react-native platform which means that for View we have React out of the box.
For state management, I've chosen Flux architecture (it's cut Redux implementation), because it has one-way data flow, one centralized store, simple API, large community - a good fit for such type of application. (but in general, such a simple app can live fully without redux, I am using it here more like a demonstration)
To reduce the number of boilerplate code with redux I decided to take redux-toolkit - https://redux-toolkit.js.org/.
It may be a little bit overkill for such a small app, but same time it will simplify the way how we will work with search, lists, categories, pagination, etc. Also if we will have some side effects - it will be easy to add redux-observable(rxjs) or redux-saga.

## Routing + React-navigation
I decided to use https://reactnavigation.org/ to provide routing. React navigation has the biggest community, best support, one of the best performance and nice docs in comparison to competitors

### Tests

In the beginning, I planned to use TDD, but after a deeper analysis of the task, I decided to skip tests almost fully in order to save some extra time and meet the deadline. 
I don't believe in unit tests for UI heavy applications as it causes big problems during refactoring and it is hard to support them. Instead I prefer to have more integration tests that describes user stories + a little bit of e2e tests.
My rule is:
 - 20% unit tests for critcal unility functions
 - 60% of integration tests that provide 80-100% coverage
 - 20% of e2e tests to cover critical cases

More about this ideology you can find here: https://kentcdodds.com/blog/?q=testing

I decided to go with jest + [testing-library](https://testing-library.com/docs/guiding-principles) for unit and integration tests and with [detox](https://github.com/wix/Detox) for e2e tests

### Typesafty

I decided to use typescript, it allows us to make code easier to maintain and understand, also it helps to prevent some bugs on compile step.
Alternative to typescript can be TDD, with TDD we can stop worrying about most of the bugs that can be handled by TS, but sadly I did not have enough time to solve tasks in TDD way.

### Linting
I decided to go with prettier + typescript strict + eslint mode by default. As for me it will provide good enough quality for the main goal of the task.

### Project structure

With bigger application, I usually prefer feature-folder approach to structure the codebase. But as the task is pretty small, I separated code by function.
It will allow me in future easialy migrate to feature-folder structure, where components, rdx, styles, api leaves near to each other.

```js
|-- e2e             // application e2e tests (detox)
|-- src
|---- __tests__     // application integration tests (testing-library)
|---- api          // data fetching logic and types
|---- data        // all redux state management
|---- hooks        // global custom react hooks
|---- components   // reusable components
|---- navigation   // application routing scheme
|---- screens   // application screens that directly used in navigation
```

#### API

I created a folder called `api` where I have entity related files with logic to how to work with them + types(ideally types should come from server).

#### State management

For state management I am using `redux-toolkit`. Everything related to it lives in `data` folder. Inside it, I used feature sub-folders, that emulate state structure – the idea is that we have sub-reducer, sub-actions, sub-selectors per feature.
Currently there is only movies and filteredMovies - independent sub-features inside redux with own sub-reducer, sub-actions, sub-selectors - it allows us to simplify readability and allows us to work with features in an easier way (smaller files, abstracted code), in case if we decide to add more features to app.

For side effects, I am using `redux-thunk` (it is built-in into redux-toolkit) as most of our requests pretty simple. But everything structured in a way that it is easy to migrate to redux-observable or redux-saga in the future, if side-effects become more complex.

#### Screens

Main logic blocks of the app live in `screens` folder. I put here the main logic blocks of the app(pages/routes - each screen independent route). The idea is that screens are more "smart" components, use async redux actions to fetch data,
then select this data, contain some business logic and redistribute all data to children. All non-reusable components and helper functions that screens use, are structured within the screen folder. This way it is easier to develop new functionality, as all the code is very close.

#### Navigation

Navigation folder contains logic that explains app how to group screens together - from where to what we can go, which parameters we can share, what type of navigation we are using.

### Main decitions

#### Styles

I did some research of available component libraries, that couple be used for the task. I considered `react-native-paper`, `react-native-elements`.
I decided not to use a pre-made components library. Here's why:

1. They can increase the complexity of a small project, as to create a UI close to design I would need to interfere with the library's code
2. Not everyone is familiar with the libabry I would choose, and with any of those there's some libabry-specific knowledge that can make code harder to understand
3. The benefit for 3-pages layout would be relatively small
4. For you, as a reviewer, it would be easier to assess my coding skills

In general I tried to be close in to the proposed design in the task and did small changes to improve user experience

#### Internatiolalization amd localization

It is always hard to add intl support at the end, so I added react-intl(formatjs) in the begining as show case how it can be implemented.
More about motivation you can read [here](https://formatjs.io/docs/react-intl/)

#### Code style

For code style I am using prettier and eslint.

## Dependencies

- [expo](https://expo.io) - icons, some helpers, infrastructure taken from them
- [redux-toolkit](https://redux-toolkit.js.org/) - everything related to state management
- [react-navigation](https://reactnavigation.org/) - for routing
- [testing-library](https://testing-library.com/docs/react-native-testing-library/intro/) - for integration tests
- [detox](https://github.com/wix/Detox) - for e2e tests

## Known issues & improvements

**Known issues:**

**1. Accessibility**
Unfortunately, I did not have time to make application fully accessible and test the accessibility. Where possible I tried to keep it in mind, but there's still a lot to improve

**2. Test on more devices**
I tested my app with Iphone 8, 11 and android Pixel 3, it is defenetly not enough to be sure that app is ready to market

**3. Inconsistent color palette**
Unfortunately, I decided to skip the idea to create consistent color palette and ThemeProvider in order to save time

**4. Only 1 test**
Not full test coverage(75%). But if it was a real life application, I would most definitely cover at least the main user flows with tests.

**5. No pagination**
It looks like API from the task do not support pagination, but in real life app it is must have feature.

**6. Weak caching strategy**
You can see some "empty" spaces when you navigate between screen fast, sadly I decided to not spend time on such kind of optimizations, cache warm up, etc. 

**7. Weak caching strategy**
With some backdrop images font colors maybe not contrast enough(I decided to save some time here too)

**7. Some minor bugs**
I have tested the flow and tried to fix all the issues. But there's definitely some bugs that I have missed.

**Improvements:**

1. I'd like to have more tests and better overall coverage
2. Have pagination
3. Warm up caches
4. Improve design
5. Add documentation on components
6. Better loading states
7. Cleanup user experience(transitions, presses, etc.)
8. Test on more devices
9. Setup CI/CD

## Timetable

> ETA 5 hours

- Analyze requirements - 0.3 hours
- Setup empty project with all ready-to-use infra (tests, lint, potential CI) - 1 hour
- Setup API layer and check that everything ready to use - 0.3 hours
- Setup data layer and check that it is ready to use - 0.5 hours
- Implement early version of the app with all critical features that required (no design, maybe some mocked data), where I can find main problems and identify some miss things + make sure that all previous infra works fine - 1 hour
- Iteration to fix infra and issues that may appear - 0.5 hours
- Basic tests coverage - 0.5 hour
- Apply design to the app, make main features more beauty + work better - 0.5 hours
- Iteration to refactor app, fix some bugs, make sure that performance and design aligned - 0.4 hours
- Bonus features - 0.6 hours
- Cleanup application code, tests, design, prepare missed docs and submit task - 0.4 hours
- Docs - 0.3 hour

`Total: 6.3 hours`