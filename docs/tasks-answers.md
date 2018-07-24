### 1. Proud of

Share a little piece of code or even an entire application, in any programming language, that you developed and you're proud of, telling us why.

**Answer**

Unfortunately, I really don't have a piece of code that I am proud of from a software engineering perspective.
At least I cannot remember of any particularly beatiful piece of code I've written. This is not surprising because I strive to write boring and predictive code. When I was younger I liked clever/hacky solutions but I've changed a lot.

But I can think of problems that I've solved which I am somewhat proud of.

The first one I described in the questionnaire (the MTU one).

The other one I can think of was solved by this ugly mess of code:
http://acm.timus.ru/problem.aspx?space=1&num=1389

This code finds the [Maximal Matching](<https://en.wikipedia.org/wiki/Matching_(graph_theory)#Maximal_matchings>) in a Tree and solves this competitive programming problem [1389. Roadworks](http://acm.timus.ru/problem.aspx?space=1&num=1389)

```python
def main():
    from sys import stdin, stdout
    from itertools import izip
    from collections import deque

    tkns = iter(map(int,stdin.read().split()))
    n = tkns.next()
    m = tkns.next()

    graph = [[] for i in xrange(n+1)]

    for u,v in izip(tkns, tkns):
        graph[u].append(v)
        graph[v].append(u)

    dp1 = {}
    dp2 = {}
    best = {}
    cache = {}

    root = u
    reverse_topological_order = deque(maxlen=n)
    stk = deque([root],n)
    app = stk.append
    while stk:
        v = stk.pop()
        if len(graph[v]) == 0:
            dp1[v] = dp2[v] = 0
            best[v] = -1
            cache[v] = 0
        else:
            reverse_topological_order.appendleft(v)
            for c in graph[v]:
                graph[c].remove(v)
                app(c)

    for v in reverse_topological_order:
        dp2[v] = sum( cache[c] for c in graph[v] )
        a = dp2[v]
        M = 0
        for c in graph[v]:
            b = 1 + dp2[c] + a - cache[c]
            if M <= b:
                M = b
                best_c = c

        dp1[v] = M
        if dp2[v] >= dp1[v]:
            best[v] = -1
            cache[v] = dp2[v]
        else:
            best[v] = best_c
            cache[v] = dp1[v]

    w = stdout.write
    stk = deque([root],n)
    w('%d\n' % cache[root])
    ret = []
    app = ret.append
    while stk:
        v = stk.pop()
        if best[v] != -1:
            app('%s %s\n' % (v,best[v]))
        stk.extend(graph[v])
    w(''.join(ret))

main()
```

From a software engineering perspective the code above is a unintelligible mess, but
I am proud of it because I am quite weak as a competitive programmer and
with my knowledge it quite challeging to understand how to solve it.

It was particularly challenging because I used Python because there were lots of loops and
in this case CPython is particularly slow.
I submitted the answer in 2015 and my solution still is [the only Python accepted solution](http://acm.timus.ru/rating.aspx?space=1&num=1389&lang=python2)!

![alt task1](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/task-1.png)

I even [blogged about it](https://codeforces.com/blog/entry/21027).

### 2. Ashamed of

Share a little piece of code or even an entire application, in any programming language, that you developed or saw and you're ashamed of (or secondhand embarrassed for), telling us why.

**Answer**

The first one that comes to mind is [this](https://github.com/felipeblassioli/spimi/blob/a891fcf8bf5326172205ca0730298176f14e35db/spimi.py#L101)

```python
def SPIMI(input_dir='data/gutenberg', output_file='index.txt', block_size=50000, is_positional=False):
	if is_positional:
		from positional_index import PositionalIndex as Index
		globals()['Index'] = Index
```

Past me Why? I had two types of Index, I could have passed the class as a parameter to the functions explicitly,
but instead a choose to do black magic `globals()`.

This was for a short university project. I guess I was trying to be as close of the book's pseudo-code as possible,
but still, atrocious.

### 4. Give us feedback

What do you think about this challenge? Is this a nice and reliable way of assessing your skills? Would you think of another way? Would you make it better?

**Answer**

I like these types of challenges because I always got to try something new and do some experimentations.
For this project I did not use before the following packages:

- [SemanticUI](https://react.semantic-ui.com/introduction)
- [ava](https://github.com/avajs)
- [zeit/now](https://zeit.co/now)

And all 3 were really pleasant. To read more about them please read the [Notable Packages](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/challenge.md) section.

Also I experimented with mixed case filenames, which was okay but still deserves more experimentation.
And this project had quite the heavy Java/Angular style, but I was quite satisfied with the result.

*Is this a nice and reliable way of assessing your skills?*

I guess it was ok, but I didn't had the time to showcase a couple of skills:

1.  GraphQL Subscriptions (Apollo) or Websockets (socketio) to push data to the client.
2.  End to end testing with [Cypress](https://www.cypress.io/)
3.  Continuos Integration using [CircleCI](https://circleci.com/) and deploying automaticaly to [zeit/now](https://zeit.co/now)

Both dashboard and teravoz-fake-api are incomplete, and especially the dashboard is far from resilient.
After finishing cleanly `apps/api` I did [XGH](http://sou.gohorseprocess.com.br/extreme-go-horse-xgh/) programming to *finish* the other two apps, the result is lack of tests and two missing components for the dashboard (EventFeed and ToggleRandomSimulationButton).

*Would you make it better?*

It was a good test and it was enjoyable doing it. 

But I found the specification/requirements too open-ended, for instance I could have done a simpler React dashboard, but that wouldn't be fun (What is the challenge of doing a simple Table/List to display structured data?).
