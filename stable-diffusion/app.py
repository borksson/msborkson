from diffusers import DiffusionPipeline
import torch

torch.cuda.empty_cache()

pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_d"type"=torch.float16, use_safetensors=True, variant="fp16")
# pipe.to("cuda")
pipe.enable_model_cpu_offload()

# if using torch < 2.0
# pipe.enable_xformers_memory_efficient_attention()

prompt = "An astronaut riding a green horse"

images = pipe(prompt=prompt).images[0]