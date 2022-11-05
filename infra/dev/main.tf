terraform {
	required_version = ">= 0.15.5, <= 1.3.3"

	required_providers {
		aws = {
			source  = "hashicorp/aws"
			version = "4.36.0"
		}
	}

	backend "s3" {
		bucket = "devpie.io-terraform"
		key    = "dev/terraform.tfstate"
		region = "eu-central-1"
	}
}

provider "aws" {
	region = "eu-central-1"
}

# To use an ACM certificate with CloudFront request the certificate in us-east-1
provider "aws" {
	alias  = "acm_provider"
	region = "us-east-1"
}