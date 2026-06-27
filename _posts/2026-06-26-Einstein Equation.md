---
title: Einstein Equation and Black Hole Proof
date: 2026-06-26 12:00:00 +0700
categories: [research]
tags: [physics, math]
---


<iframe src="{{ '/assets/pdf/relativity_equation.pdf' | relative_url }}" width="100%" height="320px" style="border: none;">
    This browser does not support PDFs. Please download the PDF to view it: <a href="{{ '/assets/pdf/relativity_equation.pdf' | relative_url }}">Download PDF</a>
</iframe>


This document breaks down the components of Einstein's Field Equation (EFE) as visualized in the accompanying 3D diagram, provides the physical framework, and executes the mathematical proof for the Schwarzschild Black Hole.

---

## 1. Parameter Analysis (Mapping the Visual Model)

The Field Equation structurally dictates a strict cause-and-effect relationship between geometry and matter:

The Field Equation structurally dictates a strict cause-and-effect relationship between geometry and matter:

$$
\underbrace{R_{\mu\nu} - \frac{1}{2}R\,g_{\mu\nu}}_{\text{Spacetime Geometry (Left Side)}} = \underbrace{\frac{8\pi G}{c^4} T_{\mu\nu}}_{\text{Energy Source (Right Side)}}
$$


### A. Spacetime Geometry (Left Side)
*   **Metric Tensor ($g_{\mu\nu}$):** Represented by the baseline background grid. It provides the reference frame for measuring spatial distances and time intervals.
*   **Ricci Curvature Tensor ($R_{\mu\nu}$) & Scalar ($R$):** Indicated by the slopes of the central gravitational funnel. It measures how sharply the coordinate grid deforms away from a flat Euclidean surface.

### B. Matter-Energy Source (Right Side)
*   **Stress-Energy Tensor ($T_{\mu\nu}$):** Represented by the red vertex core at the absolute bottom of the funnel. It encapsulates mass density, kinetic momentum, and pressure fields.
*   **Einstein Coupling Constant ($\frac{8\pi G}{c^4}$):** Serves as the constant of elasticity. Because the denominator ($c^4$) is immensely large, spacetime acts as an incredibly rigid membrane that requires vast cosmic masses to deform.

---

## 2. Mathematical Proof: The Schwarzschild Black Hole Solution

To prove the existence of a black hole, we solve the field equations for empty space surrounding a localized static, spherical mass ($M$).

### Step 1: The Vacuum Reduction
In empty space outside the mass core, the stress-energy tensor drops to zero:
$$T_{\mu\nu} = 0$$

Taking the mathematical trace of the field equation under this condition reveals that the scalar curvature $R = 0$. Consequently, the master field equation collapses to the **Vacuum Field Equation**:
$$R_{\mu\nu} = 0$$

### Step 2: The Spherically Symmetric Ansatz
Using spherical coordinates $(ct, r, \theta, \phi)$, we set up a static template with unknown functions $\alpha(r)$ and $\beta(r)$:
$$ds^2 = -e^{2\alpha(r)} c^2 dt^2 + e^{2\beta(r)} dr^2 + r^2(d\theta^2 + \sin^2\theta d\phi^2)$$

### Step 3: Integrating the Ricci Field Equations
By computing the Christoffel connection symbols and setting the Ricci tensor components to zero ($R_{00}=0, R_{11}=0, R_{22}=0$), the system yields two major conditions:
1.  Linear combination reveals: $\alpha'(r) = -\beta'(r) \implies \alpha(r) = -\beta(r)$
2.  Angular integration yields: $\frac{d}{dr}\left(r e^{2\alpha}\right) = 1 \implies e^{2\alpha} = 1 - \frac{r_s}{r}$

### Step 4: Calibrating with Newtonian Gravity
To determine the constant $r_s$, we evaluate the metric infinitely far away from the mass core ($r \to \infty$), forcing General Relativity to reduce to classical physics where the potential $\Phi = -\frac{GM}{r}$:
$$g_{00} = -\left(1 + \frac{2\Phi}{c^2}\right) = -\left(1 - \frac{2GM}{c^2r}\right)$$

Equating the coefficients defines the **Schwarzschild Radius**:
$$r_s = \frac{2GM}{c^2}$$

### Step 5: The Definitive Spacetime Metric
Substituting the integrated variables into the structural ansatz generates the final metric:
$$ds^2 = -\left(1 - \frac{2GM}{c^2r}\right)c^2dt^2 + \left(1 - \frac{2GM}{c^2r}\right)^{-1}dr^2 + r^2(d\theta^2 + \sin^2\theta d\phi^2)$$

---

## 3. Dissecting the Singularities (The Black Hole Proof)

Analyzing the boundaries of the finalized metric reveals two fatal breakdowns in coordinate space:

### 1. The Event Horizon ($r = r_s$)
When evaluating the physical coordinates at exactly $r = r_s = \frac{2GM}{c^2}$:
*   The temporal coefficient vanishes ($g_{00} \to 0$), meaning time dilates to an absolute standstill relative to a distant observer.
*   The spatial coefficient explodes ($g_{11} \to \infty$). 

This boundary forms the **Event Horizon**, a one-way mathematical surface where the escape velocity matches the speed of light ($c$).

### 2. The Physical Singularity ($r \to 0$)
To verify if the center represents a real physical collapse, we compute the coordinate-independent **Kretschmann Curvature Scalar** ($K = R^{\alpha\beta\gamma\delta}R_{\alpha\beta\gamma\delta}$):
$$K = \frac{48 G^2 M^2}{c^4 r^6}$$

As the radius shrinks toward the center ($r \to 0$), $K \to \infty$. Because an absolute physical scalar reaches infinity, the structural fabric of spacetime collapses entirely into an infinitely sharp point—the gravitational **Singularity**.

### Final Conclusion
The mathematical execution of these steps proves that compressing any mass $M$ inside its critical Schwarzschild radius forces the inevitable birth of an **Event Horizon** and a **Singularity**, which fulfills the absolute definition of a **Black Hole**.
