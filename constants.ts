
export const COMPANY_BRIEF_PROMPT_TEMPLATE = `
Produce an evidence-based, comprehensive company brief for {company_name} strictly as a single JSON object matching the schema below—no prose or text outside the JSON. For each factual claim, include mandatory inline citation(s) using "source" or "sources" fields, listing title, publisher, URL, and date (YYYY-MM-DD). Use only credible, recent (past 24 months, if possible) official company sources, investor documents, analyst/industry reports, or top-tier media—never Wikipedia, unverifiable blogs, or forums. If a required field cannot be determined, set its value to "unknown" and explain why in metadata.limitations; never fabricate data or use placeholders like "TBD".

## Requirements

- Research {company_name} thoroughly using the provided web search tool.
- Structure the entire output as a valid JSON object, in full compliance with the schema below (do not add prose or formatting outside the JSON).
- Scope:
    - Company Profile: overview, key executives, financials, 3–5 recent news items.
    - Products/Services: core offerings (features, audience, launch), target segments, unique value propositions.
    - Pricing: models, tiers, competitive pricing positioning.
    - Competitive Analysis: minimum 2 direct competitors (strengths/weaknesses/differentiation/pricing), and indirect alternatives.
    - Market Position: TAM/SAM where available, key trends, opportunities, challenges.
    - Metadata: research_date (today's date in YYYY-MM-DD), data_freshness, confidence_score, key_sources, limitations, follow_up_questions.
- For each source/citation object, include all required metadata (title, publisher, URL, date).
- No speculative, estimated, or fabricated data. If data is not publicly available, set value to "unknown" and explain in metadata.limitations.
- All sections and fields must match the shape and keys of the schema exactly.
- Review before returning:
    - JSON is valid and matches the schema exactly.
    - All factual fields (not free-text) include properly formatted and recent inline sources.
    - No prose or commentary outside or in addition to the JSON.

## Output Format

- Output only the single JSON object, fully filled in as outlined.
- Never include text, prose, or markdown outside the JSON.
- Adhere strictly to key naming, nesting, and field types as shown in the schema below.
- Inline citations must appear within each relevant field as "source" or "sources".

## JSON Schema

{
  "company_profile": {
    "overview": {
      "company_name": "{company_name}",
      "founded": "YYYY or YYYY-MM-DD",
      "headquarters": "City, State/Country",
      "industry": "Primary industry classification",
      "employee_count": "Number or range",
      "mission_statement": "Quoted or summarized mission",
      "business_model": "How the company makes money",
      "sources": [{"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]
    },
    "key_executives": [{"name": "Full Name", "position": "Job Title", "background": "Brief professional background", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "financials": {"revenue": "Latest annual revenue figure or 'unknown'", "funding": "Total funding/public status", "valuation": "Most recent valuation or 'unknown'", "profitability": "Profitability status/trend", "sources": [{"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]},
    "recent_news": [{"headline": "News headline", "date": "YYYY-MM-DD", "summary": "1–2 sentence significance", "source": {"title": "Publication", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}, "impact": "Potential business impact"}]
  },
  "products_services": {
    "core_offerings": [{"name": "Product/Service name", "description": "Concise description", "features": ["feature1", "feature2", "feature3"], "target_audience": "Primary customer segment", "launch_date": "YYYY-MM-DD or 'unknown'", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "target_segments": [{"segment_name": "Market segment name", "description": "Segment characteristics", "size": "Market size estimate or 'unknown'", "growth_rate": "Annual growth rate or 'unknown'", "source": {"title": "Market research source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "unique_value_propositions": [{"proposition": "Key value proposition", "supporting_evidence": "Evidence supporting the claim", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "pricing_structure": {
    "pricing_models": [{"model_type": "SaaS, Usage-based, One-time, etc.", "description": "How pricing works", "price_range": "Price range or specific price if public", "billing_frequency": "Monthly/Annual/etc.", "source": {"title": "Pricing page or source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "tiers": [{"tier_name": "Plan name", "price": "Specific price or 'unknown'", "features_included": ["feature1", "feature2"], "target_customer": "Intended customer type", "source": {"title": "Pricing source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "competitive_positioning": {"market_position": "Premium/Mid-market/Budget/etc.", "price_comparison": "How prices compare vs competitors", "value_justification": "Why customers pay this price", "sources": [{"title": "Comparison source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]}
  },
  "competitive_analysis": {
    "direct_competitors": [{"company_name": "Competitor name", "market_share": "Estimate or 'unknown'", "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1", "weakness2"], "pricing_comparison": "Comparison vs {company_name} or 'unknown'", "differentiation": "Key differentiating factors", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "indirect_competitors": [{"company_name": "Alternative provider", "alternative_solution": "Alternative approach", "threat_level": "High/Medium/Low", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "competitive_advantages": [{"advantage": "Specific advantage", "description": "Why it matters", "sustainability": "Sustainability of advantage", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "threats": [{"threat": "Specific competitive threat", "impact_level": "High/Medium/Low", "timeline": "Time horizon or 'unknown'", "mitigation_strategy": "Likely/possible response", "source": {"title": "Source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "market_position": {
    "market_size": {"total_addressable_market": "TAM estimate or 'unknown'", "serviceable_addressable_market": "SAM estimate or 'unknown'", "market_growth_rate": "Annual growth rate", "geographic_presence": ["Region1", "Region2"], "sources": [{"title": "Market research source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}]},
    "growth_trends": [{"trend": "Specific market trend", "impact": "Impact on {company_name}", "timeline": "Time horizon", "source": {"title": "Industry analysis source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "key_opportunities": [{"opportunity": "Growth opportunity", "potential_impact": "Estimated business impact", "feasibility": "High/Medium/Low", "source": {"title": "Supporting analysis", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}],
    "challenges": [{"challenge": "Business challenge", "severity": "High/Medium/Low", "potential_solutions": ["solution1", "solution2"], "source": {"title": "Challenge source", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}}]
  },
  "metadata": {
    "research_date": "YYYY-MM-DD",
    "data_freshness": "e.g., 'Most data within last 12 months'",
    "confidence_score": "High/Medium/Low (based on source quality and corroboration)",
    "key_sources": [{"title": "Key source title", "publisher": "Publisher/Website", "url": "https://...", "date": "YYYY-MM-DD"}],
    "limitations": ["Brief limitation statements"],
    "follow_up_questions": ["Suggested next research questions"]
  }
}
`;
