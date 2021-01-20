---
date: 2020-12-14
description: Understand how to calculate the financial cost of writing a book.
keywords: book, authorship, cost calculation
title: "The financial cost of writing a book"
aliases: 
  - /articles/the-cost-of-writing-a-book
  - /articles/the-financial-cost-of-writing-a-book
---

One essential question for every potential book author is: **What does it financially cost to write a book?** Obviously, there is no universal answer to this. Furthermore, in most cases, the goal is to not only cover the cost, but also to earn additional money. In any case, it is important to know what the financial cost of a book project is. Only then, one can decide whether it is worth to do it.

This post explains how to calculate the financial cost of writing a book. The relevant components of a potential calculation are described and illustrated with an example. As final outcome, a formula is presented that incorporates all the described parts. Naturally, the specific cost for a book depends on many factors. Therefore, this post is best to be seen as inspiration for a more specific and detailed calculation.

## Context and example

For the context of the following calculation, it is assumed that the only involved person is an author. This means, there are no co-authors, editors or reviewers. Also, the book is assumed to be self-published as e-book via a publishing platform, such as [Leanpub](https://leanpub.com/). Therefore, there are no costs associated with the selling process.

As example, I am using my own publication ["Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing). This is the first book I have written and published. The book was a side project for almost exactly four years. One thing I have learned from it is the importance of being honest about the financial aspects. While writing a book has numerous beneficial effects, the most common primary goal is to earn money.

## Financial investment

Writing a book is comparable to a financial investment. Instead of directly investing money, one has to invest time. This may sound appealing at first, but the time spent on a book reduces the time spent earning money. Every invested minute potentially causes a financial loss at first. This demands the existence of savings or an additional source of income. Writing a book either requires money to live off or additional time to earn money to live off.

## Working time

The first component for a cost calculation is the working time. This is also the most difficult value, as it is unknown at the beginning of a project. Ideally, it can be estimated based on prior experience. Instead of a fixed value, it is helpful to define a range between an optimistic and a pessimistic estimation. While it is hard to predict the time initially, the value can be tracked continuously and estimations can be refined.

For my own book, I did not perform any realistic estimation. Rather, I only defined arbitrary points in time when I intended to be finished. Needless to say, these intentional release dates were always incorrect. While I performed detailed time tracking, I only did so for 75% of the time. Consequently, I have no tracking data for the first year. The tracking taught me that the numbers can be really useful, but detailed descriptions are not required.

> I invested around 1894 hours in working on my book.

The total time I tracked for my book is 1579 hours. For the missing first year, the hours can be estimated using the history of my git repository. In the three years during which I performed tracking, there were 1092 commits. This makes an average of 1.45 hours per commit. In the first year, there were 217 commits. Based on the commit-hour ratio, this makes 315 additional hours. In total, I invested around 1894 hours in working on my book.

### Hours compared to time

> One year full-time work with 9 hours per day.

Generally, it is hard to tell how hours relate to a time span. For the book context, it can help to translate a full-time job to hours. One year has 52 weeks and therefore 260 workdays. Assume that an average person has 30 paid holidays, 10 paid sick days and 5 public holidays. After subtracting these values, this leaves 215 days. Based on that, my invested hours are equivalent to one year full-time work with almost 9 hours per day.

## Cost of work

The second calculation component is the cost of work. This part can be specified as hourly rate. For self-employed workers, it is the same rate one would charge for client projects. For employed people, determining the correct value is more difficult. One has to account for paid vacation, paid sick leave, bank holidays, employer contributions to insurances, work equipment, etc. In fact, it should be more productive to determine the rate a freelancer would get for the same job.

> Book cost = Hours * Rate

For my own book, I can calculate the hourly rate based on what I charged for clients. In the first two years, my rate was 85 Euro. In the third year, it was 90 Euro. Finally, in the fourth year, the rate was 92 Euro. For a correct average, the values must be weighted using the invested hours per year. The resulting average hourly rate is 88.6 Euro. Therefore, the base book cost is 167,808 Euro (or 204,726 USD).

> 1894 hours * 88.6 Euro / hour = 167,808 Euro (or 204,726 USD)

## Perks discount

In terms of qualities and benefits, working on a book is often not the same as paid work. Many times, it is a matter of passion and should be more satisfying in the long run. Also, a personal work schedule is typically more flexible. Furthermore, writing a book is an experience with many beneficial effects, such as improving language skills or deepening specific knowledge. For such perks, it can make sense to discount the assumed cost of work.

> Book costs = Hours * Rate * Perks discount

Overall, my experience with writing a book was positive. For one, my language and writing skills improved drastically. Also, the way of processing thoughts and tackling problems changed for the better. On top of that, I became proficient in DDD, CQRS and Event Sourcing. However, the work was sometimes frustrating and energy-consuming. In terms to payment, I would be satisfied with 75% of the money I could have earned otherwise. This reduces the book cost to 125,856 Euro (or 153,544 USD). 

> 167,808 Euro - 25% discount = 125,856 Euro (or 153,544 USD)

## Rate of return

Financial investments should yield a return of income. Money is invested with the expectation that a higher amount is returned. The rate of return depends on various factors. One of them is the risk of losing the invested money. Interestingly, the [Leanpub Manifesto](https://leanpub.com/manifesto) describes a book as "a risky, highly creative endeavor undertaken by a small team, with low probability of success". This statement implies that one should calculate with a high rate of return for a book project.

> Book costs = Hours * Rate * Perks discount * Return rate

For my own book, I do not include a return rate in the original cost calculation. One reason is that I am not experienced with financial investments. Therefore, it is unlikely I would have invested the money if it had been available to me. Also, the idea of including a return rate seems diametrical to the perks discount. In the end, I am willing to accept less money than I could have earned because of the previously described benefits.

## Time for marketing

Selling a book requires to invest time or money into marketing, just like with any other product. The marketing part reminds of a phrase I heard once: "Just because you build a website, it will not get visited.". While writing a book is the specific work, marketing is the necessary activity for selling it. This article assumes that the book author is also doing the marketing, but only by investing time. Financial costs for marketing-related products are not considered.

> Marketing costs = Hours * Rate * Perks discount * Return rate

For my own book, I am doing the marketing myself. While I have limited experience in this field, it is a great opportunity for learning. As for the required time, I cannot make reliable predictions. Rather, I opt for a value that seems reasonable to me. I assume that 200 hours of marketing work should provide a good result. For the calculation, the same perks discount is applied. This makes an estimated marketing cost of 13,290 Euro (or 16,214 USD).

> (200 hours * 88.6 Euro / hour) - 25% discount = 13,290 Euro (or 16,214 USD)

## Putting it all together

The individual components described in the previous sections can be combined into a single formula. Altogether, the cost is the invested time multiplied by the working rate, a potential discount and an expected return rate. As mentioned previously, this naive approach should be used as inspiration for a more detailed calculation. There are many factors that can influence the financial cost of writing a book. Nevertheless, this guidance can serve as a useful starting point.

> Book costs = Invested hours * Rate * Perks discount * Return rate

For my book ["Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing), the overall calculation is as follows: (1894 hours + 200 hours) * 88.6 Euro / hour - 25% discount = 139,146 Euro. This means, the financial cost of writing and initially marketing the book is 139,146 Euro (or 169,758 USD). Further, it implies that only after earning this much money , each sold unit is actual profit. However, any additionally invested time again produces costs.

> The financial cost of writing and marketing my book is 139,146 Euro (or 169,758 USD).

## After all, time is money

Writing a book seems financially appealing, as it "only" requires a time investment. While this is true for most cases, the amount of time needed can be quite large. Also, the chances of success can be rather low, depending on the market. Despite the numerous beneficial effects, it should be well thought through from a financial viewpoint.

[Buy the book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)
•
[Discuss on Twitter](https://twitter.com/lx_lawrence/status/1340259353530687489)