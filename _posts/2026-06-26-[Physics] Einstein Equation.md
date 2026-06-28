---
title: Einstein's Field Equations and How Schwarzschild Discovered Black Holes
date: 2026-06-28
categories: [physics]
tags: [general-relativity, black-holes, schwarzschild]
---

<iframe src="{{ '/assets/pdf/relativity_equation.pdf' | relative_url }}" width="100%" height="340px" style="border: none;">
    Your browser doesn't support PDFs. <a href="{{ '/assets/pdf/relativity_equation.pdf' | relative_url }}">Download the PDF here</a>.
</iframe>

In 1915 Einstein published his greatest work: the theory of General Relativity. Just one year later, while serving in World War I, a German physicist named Karl Schwarzschild found the first exact solution to Einstein’s equations. What he discovered was shocking — the mathematics naturally predicted black holes.

Let me walk you through it in a way that actually makes sense.

---

### Einstein’s Core Idea

Einstein’s field equation basically says this:

**Matter and energy tell spacetime how to curve, and curved spacetime tells matter how to move.**

The equation looks like this:

$$
R_{\mu\nu} - \frac{1}{2}R\,g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}
$$

The left side describes the curvature of spacetime. The right side describes mass and energy. In the 3D diagram, you can see the red mass at the bottom warping the grid above it.

---

### The Vacuum Case – Empty Space Around a Mass

To find a solution, Schwarzschild looked at the space **outside** a spherical mass (like a star) where there is no other matter. In that region, the stress-energy tensor is zero:

$$
T_{\mu\nu} = 0
$$

This simplifies Einstein’s equation to:

$$
R_{\mu\nu} = 0
$$

Now we need to find how spacetime is curved when there’s nothing there except the gravitational influence of the central mass.

---

### The Smart Assumption

Because the mass is spherical and not spinning, Schwarzschild assumed spacetime must be symmetric too. He proposed this general form for the line element (how we measure distances in space and time):

$$
ds^2 = -e^{2\alpha(r)} c^2 dt^2 + e^{2\beta(r)} dr^2 + r^2 (d\theta^2 + \sin^2\theta d\phi^2)
$$

He didn’t guess the final answer. He just chose a reasonable mathematical form with two unknown functions α(r) and β(r), then solved for them using the vacuum equation.

After some serious calculation, the equations forced a relationship: α(r) = –β(r), and eventually:

$$
e^{2\alpha(r)} = 1 - \frac{r_s}{r}
$$

---

### Connecting to Real Life

To figure out what $r_s$ actually is, Schwarzschild matched his solution to Newtonian gravity when you’re very far from the mass. That gave him:

$$
r_s = \frac{2GM}{c^2}
$$

This value is now called the **Schwarzschild radius**.

---

### The Final Metric and What It Means

Putting it all together, we get the famous Schwarzschild metric:

$$
ds^2 = -\left(1 - \frac{2GM}{c^2 r}\right)c^2 dt^2 + \left(1 - \frac{2GM}{c^2 r}\right)^{-1} dr^2 + r^2(d\theta^2 + \sin^2\theta d\phi^2)
$$

Now comes the dramatic part.

When the radial distance **r** equals the Schwarzschild radius $r_s$, something very strange happens. The time component goes to zero for distant observers, and the spatial component blows up. 

**This is the event horizon** — the point of no return. 

Once anything crosses this boundary, it can never escape, not even light. At that moment, the mathematics has just described the birth of a black hole.

---

This solution came straight out of Einstein’s equations. Schwarzschild didn’t set out to find black holes, the math simply led him there. And over a century later, we’ve taken pictures of them.

Pretty wild when you think about it.