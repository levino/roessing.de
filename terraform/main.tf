provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# HINWEIS: Das Deployment läuft als Cloudflare Worker (nicht Pages).
# Die Terraform-Ressource heißt noch "cloudflare_pages_project" weil der
# Cloudflare Terraform Provider diese Ressource für Workers mit Git-Integration nutzt.
resource "cloudflare_pages_project" "roessing_de" {
  account_id        = var.cloudflare_account_id
  name              = "roessing-de"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner                          = "levino"
      repo_name                      = "roessing.de"
      production_branch              = "main"
      pr_comments_enabled            = true
      deployments_enabled            = true
      production_deployment_enabled = true
      preview_deployment_setting     = "all"
      preview_branch_includes        = ["*"]
      preview_branch_excludes        = []
    }
  }

  build_config {
    build_command   = "npm run setup && npm run build"
    destination_dir = "dist"
    root_dir        = ""
  }

  deployment_configs {
    preview {
      compatibility_date                   = "2024-11-28"
      compatibility_flags                  = []
      fail_open                            = true
      always_use_latest_compatibility_date = false
      usage_model                          = "standard"
    }
    production {
      compatibility_date                   = "2024-11-28"
      compatibility_flags                  = []
      fail_open                            = true
      always_use_latest_compatibility_date = false
      usage_model                          = "standard"
    }
  }
}
