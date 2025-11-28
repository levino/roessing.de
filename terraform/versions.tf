terraform {
  required_version = ">= 1.5"

  cloud {
    organization = "levinkeller"
    workspaces {
      name = "roessing-de"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}
